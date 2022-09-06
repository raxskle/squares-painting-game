<template>
  <div ref="cc" id="canvasContainer">
    <div class="lastPaintBar">{{lastPaintText}}</div>
    <div class="shareBtn" @click="popSharePage">
      <img :src="shareBtnIcon"/>
    </div>
    <v-stage ref="stage" :config = "configKonva" @touchmove="scaleMove" @touchstart="scaleStart" @touchend="scaleEnd">
      <v-layer ref="layer" :config="configLayer">

        <v-group ref="Field" :config="configField" @touchstart="ar">
          <v-rect v-for="(square, index) in configSquares " :key="index" :config="square" @touchend="colorEvent" />          
        </v-group>

        <!-- <v-image :config="configImage"></v-image> -->
        <!-- <v-rect :config="a"></v-rect> -->
        <!-- <v-text :config="text"></v-text> -->

      </v-layer>
    </v-stage>
  </div>

  <div v-if="showSharePage" class="sharePage" @click="fadeSharePage">
    <div class="shareBox"   @click.stop="null">
      <img :src="shareCardImg"  @touchstart="startTimer" @touchend="endTimer"  />
      <div class="shareSaveTips">长按图片保存</div>
    </div>
  </div>


</template>


<script setup>
import user from "@/modules/userState";
import router from "@/router";
import { toRefs, ref, reactive, defineProps, defineEmits,onMounted,watch  } from "vue";
import canvas from "../../modules/canvasState";
import axios from "../../request/axios";
import cdtime from "../../modules/cdtime";
// import 直接执行

const props = defineProps({
  mode: {
    type: Number,
    default: 0
  },
  refresh: {
    type: Boolean,
  },
});
const { mode,refresh } = toRefs(props);   //得到的props是响应式的
// console.log("mode.value:",mode.value);
let emit = defineEmits(['changeMode',"changeRefresh"]);

// 画布缩放
let configLayer = reactive({
  scaleX:1,
  scaleY: 1,
  // fill:"#f2f2f2",
})
let urlprefix = process.env.VUE_APP_develope == "true"? "":"/drill-battle";

let shareBtnIcon = ref('shareIcon.png');

let shareCardImg = ref("");
shareCardImg.value = `${urlprefix}/shareImg${user.group.value}.jpg`;

// 初始化数据
// console.log("进入主页面且开始初始化数据");
canvas.initCanvasData();

let configKonva = canvas.configKonva;
canvas.fillConfigKonva();

let configField = canvas.configField;
canvas.fillconfigField();

let configSquares = canvas.configSquares;
canvas.fillConfigSquares();


// cc是canvasContainer
let cc = ref(null);
let stage = ref(null);
// Field是画布
let Field = ref(null);
// onMounted(() => {
//   // console.log("canvasContainer", cc.value);  
//   // let FieldContext = Field.value.getNode().children[26];用children拿就会乱序
//   // console.log(FieldContext);
//   // 用name拿不会乱序
//   if (canvas.lastPosition.value[0] != -1 && canvas.lastPosition.value[1] != -1) {
//     stage.value.getStage()
//       .find(`.square${canvas.latestPosition.value[0] * canvas.squareXnum + canvas.latestPosition.value[1]}`)[0]
//       .moveToTop();
//     // 首次显示最新格子：进入主页面之前请求，fill时设置stroke，mounted时movetoTop
//     console.log(canvas.configSquares);    
//   }

// })

let saveSquare = {
  squareName: "square0",
  squareId:-1,
  stroke: "#c8c8c8",
  strokeWidth: 1,
};


// 双指缩放
let currentFieldX;
let currentFieldY;
let ar = (event) => {
  // console.log("点到了field", event.target.parent);
  currentFieldX = event.target.parent.attrs.x;
  currentFieldY = event.target.parent.attrs.y;
}

let scaleController = reactive({
  scale: 1,    //field 的缩放倍率
  centerX0: 0,   //点击中心位置相对于stage的位置
  centerY0: 0,
  centerXf: 0,     //点击中心位置相对于field的位置
  centerYf:0,
  oldDistance:0,   //上一次move的两指间距离
});

let getDistance = (a,b) => {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
let getCenter = (a,b) => {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

// let text = reactive({
//   x: 0,
//   y: 0,
//   text: "no",
//   fontSize: 20,
//   fontFamily: 'Calibri',
//   fill: 'green'
// })

let scaleStart = (event) => {
// 设置初始的两指距离
  if (event.evt == undefined) {
    // console.log("touchstart", event);    
    if (event.touches.length == 2) {
      let a = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      }
      let b = {
        x: event.touches[1].clientX,
        y: event.touches[1].clientY,        
      }
      let distance = getDistance(a, b);
      scaleController.oldDistance = distance;

      // 求client中间点
      let center = getCenter(a, b);
      // 得到中间点在stage里的坐标
      let stageX = document.querySelector("#canvasContainer").getBoundingClientRect().x;
      let stageY = document.querySelector("#canvasContainer").getBoundingClientRect().y;

      scaleController.centerX0 = center.x - stageX;
      scaleController.centerY0 = center.y - stageY;    
      scaleController.centerXf = (scaleController.centerX0 - currentFieldX )/scaleController.scale * canvas.fieldScale0;
      scaleController.centerYf = (scaleController.centerY0 - currentFieldY )/scaleController.scale * canvas.fieldScale0;          

      // text.text = `start ${scaleController.oldDistance}`;  
    }
  }
}

let scaleEnd = (event) => {
  // 去除这次的两指初始距离
  // console.log("end:", event);
  if (event.evt == undefined) {
    scaleController.oldDistance = 0;

    // text.text = `end`;  

  }
}

let scaleMove = (event) => {
  if (event.evt == undefined) {
    // 此时event是stage而不是点到了rect
  // console.log("event.changedTouches", event.changedTouches);
  // console.log("event.changedTouches[0].clientX", event.changedTouches[0].clientX);
    if (scaleController.oldDistance != 0) {
      // 存在上一次的两指距离
      if (event.changedTouches.length == 2) {
        // 两个触点是缩放
        // 得到新的两指距离
        let a = {
          x: event.changedTouches[0].clientX,
          y: event.changedTouches[0].clientY,
        }
        let b = {
          x: event.changedTouches[1].clientX,
          y: event.changedTouches[1].clientY,        
        }
        let newDistance = getDistance(a, b);
        // 两次之比求出这次move增减的倍率
        let scrollSpeed = 0.08 * canvas.squareXnum/25;
        let ratio = newDistance / scaleController.oldDistance * scrollSpeed;
        if (ratio > 1.5 * scrollSpeed) {
          ratio = 1.5 * scrollSpeed;
        } else if (ratio < 0.7 * scrollSpeed) {
          ratio = 0.7 * scrollSpeed;
        }
        // 得到真实scale
        if (ratio > 1*scrollSpeed) {
          scaleController.scale = scaleController.scale + ratio > 4 ? 4 : scaleController.scale + ratio;          
        } else if (ratio < 1*scrollSpeed) {
          scaleController.scale = scaleController.scale - ratio > 4 ? 4 : scaleController.scale - ratio;             
        }
        // 设置缩放范围
        if (scaleController.scale < 1) {
          scaleController.scale = 1;
        }
        if (scaleController.scale > 4*canvas.squareXnum/25) {
          scaleController.scale = 4*canvas.squareXnum/25;
        }

        // text.text = `${scaleController.scale}
        // ${scaleController.centerX}
        // ${scaleController.centerY}`;  

        // 控制fieldscale
        if (scaleController.scale == 1) {
        // 当scale==1时强制field回归fieldScale0，fieldX0，fieldY0，不能drag
          canvas.configField.scaleX = canvas.fieldScale0;
          canvas.configField.scaleY = canvas.fieldScale0;
          canvas.configField.x = canvas.fieldX0;
          canvas.configField.y = canvas.fieldY0;
          canvas.configField.draggable = true;
          canvas.configField.dragBoundFunc = function () {
            return {
              x: canvas.fieldX0,
              y: canvas.fieldY0,
            };
          };
        } else if (scaleController.scale > 1) {
        // 当scale>1时 根据中心坐标为中心，sacle为倍率，能drag并且设置范围限制
          canvas.configField.draggable = false;        
          canvas.configField.scaleX = scaleController.scale * canvas.fieldScale0;
          canvas.configField.scaleY = scaleController.scale * canvas.fieldScale0;
          canvas.configField.x = scaleController.centerX0 - scaleController.centerXf * scaleController.scale * canvas.fieldScale0;
          canvas.configField.y = scaleController.centerY0 - scaleController.centerYf * scaleController.scale * canvas.fieldScale0; 
        }

        // 设置这次的两指位置作为下次move的参考
        scaleController.oldDistance = newDistance;
      } 
    }
    if (event.changedTouches.length == 1) {
      // 一个触点是drag
      if (scaleController.scale == 1) {
        canvas.configField.draggable = true;
        canvas.configField.dragBoundFunc = function () {
          return {
            x: canvas.fieldX0,
            y: canvas.fieldY0,
          };
        };
      } else if (scaleController.scale > 1) {
        canvas.configField.draggable = true;
        canvas.configField.dragBoundFunc = function (pos) {
          let newY = pos.y;
          if (pos.y > canvas.stageHeight*0.3) {
            newY = canvas.stageHeight*0.3;
          } else if (pos.y < canvas.stageHeight- canvas.fieldHeight*canvas.configField.scaleY - canvas.stageHeight*0.3) {
            newY = canvas.stageHeight- canvas.fieldHeight*canvas.configField.scaleY - canvas.stageHeight*0.3;
          } else {
            newY = pos.y;
          }
          let newX = pos.x;
          if (pos.x > canvas.stageWidth*0.3) {
            newX = canvas.stageWidth * 0.3;
          } else if (pos.x <  canvas.stageWidth- canvas.fieldWidth*canvas.configField.scaleX - canvas.stageWidth*0.3) {
            newX =  canvas.stageWidth- canvas.fieldWidth*canvas.configField.scaleX - canvas.stageWidth*0.3 ;
          } else {
            newX = pos.x;
          }    
          return {
            x: newX,
            y: newY
          };
        };        
      }
    }
  }
}




// 更新画布
let drawCanvas=()=>{
  // 更新画布时的draw操作
  // 将[i][j]转换为i*rownum+j

  // 更新整个画布
  console.log("into drawCanvas更新画布");
  for (let i = 0; i < canvas.squareYnum; i++) {
    for (let j = 0; j < canvas.squareXnum; j++) {
      // 更新所有格子颜色
      canvas.configSquares[i * canvas.squareXnum + j].fill = canvas.squareColor(i,j);
      // 更新所有格子所属
      canvas.configSquares[i * canvas.squareXnum + j].occupy = canvas.setOccupy(i, j);
    }
  }
  // 更新最新格子
  if (canvas.latestPosition.value[0] != -1 && canvas.latestPosition.value[1] != -1) {
    if (canvas.lastPosition.value[0] != -1 && canvas.lastPosition.value[1] != -1) {
      // console.log("canvas.lastPosition存在")
      canvas.configSquares[
        canvas.lastPosition.value[0] * canvas.squareXnum + 
          canvas.lastPosition.value[1]
      ].stroke = "rgb(200, 200, 200)";
    }
    canvas.configSquares[
      canvas.latestPosition.value[0] * canvas.squareXnum + 
        canvas.latestPosition.value[1]
    ].stroke = "black"; 

    // 最新格子movetoTop
    stage.value.getStage()
    .find(`.square${canvas.latestPosition.value[0] * canvas.squareXnum + canvas.latestPosition.value[1]}`)[0]
    .moveToTop();    
  }

};

let updateCanvas=()=>{
  // 请求canvas
  axios
    .get(`/canvas`)
    .then((res) => {
      // console.log("get canvas数据:", res);
      canvas.canvasState.value = res.data.data.canvas;
      // 每天0点换画布
      if (canvas.canvasState.value.length != canvas.squareYnum) {
        router.replace("/loading");
        location.reload(true);
      }
      // 每次请求将last变为latest
      canvas.lastPosition.value = canvas.latestPosition.value;
      canvas.group1Num.value = res.data.data.pixels_num.group_1;
      canvas.group2Num.value = res.data.data.pixels_num.group_2;

      if (res.data.data.last_paint == null) {
        canvas.latestPosition.value = [-1, -1];
      } else {
        canvas.latestPosition.value = res.data.data.last_paint.pixel_position;
      }

      // 获取xx分钟前xx涂色
      if (res.data.data.last_paint != null) {
        // console.log("res.data.data.last_paint.time",res.data.data.last_paint.time);
        // console.log("res.data.data.last_paint.nickname",res.data.data.last_paint.nickname)
        if (canvas.lastPaintTime.value == res.data.data.last_paint.time) {
          if (canvas.lastPaintName.value == res.data.data.last_paint.nickname) {
            let nowTime = Math.floor( Date.now()/1000);
            let lastTime;
            // console.log("跑时间，nowTime",nowTime);
            if (res.data.data.last_paint.time > 1600000000000) {
              lastTime = Math.ceil(res.data.data.last_paint.time / 1000);
            }else {
              lastTime = res.data.data.last_paint.time;
            }
            // console.log("跑时间，lastTime",lastTime);            
            canvas.lastPaintMin.value = Math.floor((nowTime - lastTime)/60);
            console.log("canvas.lastPaintMin.value",canvas.lastPaintMin.value);
          }
        }

        canvas.lastPaintTime.value = res.data.data.last_paint.time;
        canvas.lastPaintName.value = res.data.data.last_paint.nickname;
        canvas.lastPaintGroup.value = res.data.data.last_paint.group;
        // console.log("canvas.lastPaintGroup.value!!",canvas.lastPaintGroup.value);
      } else {
        canvas.lastPaintTime.value = 0;
      }
    

      // console.log("canvas.canvasState.value:",canvas.canvasState.value); 

      drawCanvas();
      // console.log("成功刷新画布");
    })
    .catch((res) => {
      console.log("请求canvas发生错误：",res);
    });
};

// 每隔20s获取并刷新canvs数据
setInterval(updateCanvas, 20000);// setInterval里的函数不要用this

// 涂色后刷新canvas数据
watch(refresh, (newval) => {
  if (newval == true) {
    updateCanvas();
    // 清除存储的方块，防止将自己上次涂的方块变灰
    saveSquare.squareId = -1;
    saveSquare.squareName = "square0";
    emit("changeRefresh", false);
  }
})




// 改变模式
// let changeModeTo0 = () => {
//   if (mode.value == 1) {
//     emit("changeMode", 0);
//   }
// };
let changeModeTo2 = () => {
  if (mode.value == 1) {
    emit("changeMode", 2);
  }
};

// mode切换 改变方格边框
watch(mode, (newval,oldval) => { 
  if (newval == 1) {
    for (let i = 0; i < canvas.squareYnum; i++) {
      for (let j = 0; j < canvas.squareXnum; j++) {
        if (canvas.configSquares[i * canvas.squareXnum + j].occupy != 3) {
          // 非镂空格子
          canvas.configSquares[i*canvas.squareXnum+j].strokeWidth = 1;          
        } else if (canvas.configSquares[i * canvas.squareXnum + j].occupy == 3) {
          // 镂空格子将其图层移动到底部，防止边缘格子边框显示错误
            stage.value.getStage()
            .find(`.square${i * canvas.squareXnum + j}`)[0]
            .moveToBottom();
        }
      }
    }

    // let FieldContext = Field.value.getNode().children[26];
    // FieldContext.moveToTop();
    // console.log(FieldContext);  
    // stage.value.getStage().find(".square26")[0].moveToTop();
  
  } else if (newval == 0) {

    for (let i = 0; i < canvas.squareYnum; i++) {
      for (let j = 0; j < canvas.squareXnum; j++) {
        if (canvas.configSquares[i * canvas.squareXnum + j].occupy != 3) {
          canvas.configSquares[i*canvas.squareXnum+j].strokeWidth = 0;          
        }        
      }
    }

  }
  if (newval == 1 && oldval == 2) {
    // 涂色失败返回来
    let target = stage.value.getStage().find(`.${saveSquare.squareName}`)[0];
    target.attrs.strokeWidth = saveSquare.strokeWidth;
    target.attrs.stroke = saveSquare.stroke;
    // console.log("涂色失败时latest",target.attrs.stroke); 
    // 神奇的bug，注释掉if就能让latest变回黑色
    // if (target.attrs.stroke != "black") {
      target.moveToBottom();
    // }    
  }
});


// 涂色事件  其实是在点击的位置post group

let colorEvent = function (event) {
  // console.log("点击了这个格子", event.evt);
  if (mode.value == 1 || mode.value == 2) {
    if (user.group.value != event.target.attrs.occupy && event.target.attrs.occupy != 3) {
      // 在这里涂色    
      // 获得位置信息
      let name = event.target.attrs.name;
      let id = name.slice(6);
      console.log("click this ", id);
      let i = Math.floor(id / canvas.squareXnum);
      let j = id % canvas.squareXnum;
      let targetSquare = [];
      targetSquare.push(i);
      targetSquare.push(j);
      console.log(targetSquare);
      // 标记选中格子
      canvas.targetSquare.value = targetSquare;

      changeModeTo2();
      let Stage = stage.value.getStage();

      // 将上一个恢复平常
      if (saveSquare.squareId != -1) {
        console.log("恢复上一个")
        let lastTarget = Stage.find(`.${saveSquare.squareName}`)[0];
        console.log("lastTarget.attrs", lastTarget.attrs);
        console.log("saveSquare.squareName")
        lastTarget.attrs.strokeWidth = saveSquare.strokeWidth;
        lastTarget.attrs.stroke = saveSquare.stroke;
        if (lastTarget.attrs.stroke != "black") {
          lastTarget.moveToBottom();
        }
        // 上一个的周围如果有镂空，就将镂空movetobottom
        let below = Number(saveSquare.squareId) + Number(canvas.squareXnum);
        if (below < canvas.squareXnum * canvas.squareYnum && Stage.find(`.square${below}`)[0].attrs.occupy == 3) {
          Stage.find(`.square${below}`)[0].moveToBottom();
        }
        let above = Number(saveSquare.squareId) - Number(canvas.squareXnum);
        if (above >= 0 && Stage.find(`.square${above}`)[0].attrs.occupy == 3) {
          Stage.find(`.square${above}`)[0].moveToBottom();
        }
        let left = Number(saveSquare.squareId) - 1;
        if (left >= 0 && Stage.find(`.square${left}`)[0].attrs.occupy == 3) {
          Stage.find(`.square${left}`)[0].moveToBottom();
        }
        let right = Number(saveSquare.squareId) + 1;
        if (right < canvas.squareXnum * canvas.squareYnum && Stage.find(`.square${right}`)[0].attrs.occupy == 3) {
          Stage.find(`.square${right}`)[0].moveToBottom();
        }

      } else {
        console.log("初次选择");
      }


      // 存储当前
      let target = Stage.find(`.${name}`)[0];
      saveSquare.squareName = target.attrs.name;
      saveSquare.squareId = id;

      saveSquare.stroke = target.attrs.stroke;
      saveSquare.strokeWidth = target.attrs.strokeWidth;
      console.log("保存当前的stroke", saveSquare.stroke);

      // 操作当前
      target.moveToTop();
      target.attrs.strokeWidth = 3;
      target.attrs.stroke = "#c8c8c8";

    }
  } else if (mode.value == 0 && event.evt.changedTouches.length <= 1  &&event.evt.targetTouches.length == 0) {
      if (user.CDtime.value == 0) {
        emit("changeMode", 1);
      } 
    }    
  
}



let lastPaintTime = canvas.lastPaintTime.value;
let lastPaintName = canvas.lastPaintName.value;
if (lastPaintName.length > 8) {
  lastPaintName = lastPaintName.slice(0, 8)+"...";
}
let lastPaintMin;
let lastPaintRawText;
if (lastPaintTime == 0) {
  lastPaintRawText = ``;
} else if (lastPaintTime > 0) {
  if (lastPaintTime > 1600000000000) {
    lastPaintTime = Math.ceil(lastPaintTime / 1000);
  }
  let nowTime = Math.floor(Date.now() / 1000);
  lastPaintMin = Math.floor((nowTime - lastPaintTime) / 60);
  if (lastPaintMin < 0) {
    lastPaintMin = 0;
  }
  let lastPaintHour = 0;
  if (lastPaintMin >= 60) {
    lastPaintHour = Math.floor(lastPaintMin / 60);
    lastPaintMin = lastPaintMin % 60;
    lastPaintRawText = `${lastPaintHour}小时${lastPaintMin}分钟前“${lastPaintName}”涂色`;  
  } else {
    if (lastPaintMin == 0) {
      lastPaintRawText = `刚刚“${lastPaintName}”涂色`;
    } else {
      lastPaintRawText = `${lastPaintMin}分钟前“${lastPaintName}”涂色`;     
    }

  }

}
let lastPaintText = ref(lastPaintRawText);


onMounted(() => {
  // console.log("canvasContainer", cc.value);
  // let FieldContext = Field.value.getNode().children[26];用children拿就会乱序
  // console.log(FieldContext);
  // 用name拿不会乱序
  // console.log("mainCanvas onMounted");
  if (canvas.latestPosition.value[0] != -1 && canvas.latestPosition.value[1] != -1) {
    stage.value.getStage()
      .find(`.square${canvas.latestPosition.value[0] * canvas.squareXnum + canvas.latestPosition.value[1]}`)[0]
      .moveToTop();
    // 首次显示最新格子：进入主页面之前请求，fill时设置stroke，mounted时movetoTop
    // console.log(canvas.configSquares);
  }

  let lastpaintBar = document.querySelector(".lastPaintBar");
  console.log("set color :canvas.lastPaintGroup.value",canvas.lastPaintGroup.value);
  if (canvas.lastPaintGroup.value == 1) {
    lastpaintBar.style.backgroundColor = "#00d599";
  } else if (canvas.lastPaintGroup.value == 2) {
    lastpaintBar.style.backgroundColor = "#ffc500";
  }  
  // if (user.group.value == 1) {
  //   lastpaintBar.style.backgroundColor = "#00d599";
  // } else if (user.group.value == 2) {
  //   lastpaintBar.style.backgroundColor = "#ffc500";
  // }

  if (lastPaintTime > 0) {
    document.querySelector(".lastPaintBar").className = "lastPaintBar fade-in";
  }
})



watch(canvas.lastPaintTime, (newval) => {
  if (newval > 0) {
    lastPaintName = canvas.lastPaintName.value;
    if (lastPaintName.length > 8) {
      lastPaintName = lastPaintName.slice(0, 8) + "...";
    }
    lastPaintTime = canvas.lastPaintTime.value;
    if (lastPaintTime > 1600000000000) {
      lastPaintTime = Math.ceil(lastPaintTime / 1000);
    }
    let nowTime = Math.floor(Date.now() / 1000);
    lastPaintMin = Math.floor((nowTime - lastPaintTime) / 60);
    if (lastPaintMin < 0) {
      lastPaintMin = 0;
    }
    
    // lastPaintRawText = ``;  
    // lastPaintText.value = lastPaintRawText;
    document.querySelector(".lastPaintBar").className += " fade-out";
    setTimeout(() => {

      let lastpaintBar = document.querySelector(".lastPaintBar");
      console.log("set color :canvas.lastPaintGroup.value",canvas.lastPaintGroup.value);
      if (canvas.lastPaintGroup.value == 1) {
        lastpaintBar.style.backgroundColor = "#00d599";
      } else if (canvas.lastPaintGroup.value == 2) {
        lastpaintBar.style.backgroundColor = "#ffc500";
      }  

      let lastPaintHour = 0;
      if (lastPaintMin >= 60) {
        lastPaintHour = Math.floor(lastPaintMin / 60);
        lastPaintMin = lastPaintMin % 60;
        if (lastPaintMin == 0) {
          lastPaintRawText = `${lastPaintHour}小时前“${lastPaintName}”涂色`;  
        } else {
          lastPaintRawText = `${lastPaintHour}小时${lastPaintMin}分钟前“${lastPaintName}”涂色`;  
        }
        
      } else {
        if (lastPaintMin == 0) {
          lastPaintRawText = `刚刚“${lastPaintName}”涂色`;
        } else {
          lastPaintRawText = `${lastPaintMin}分钟前“${lastPaintName}”涂色`;     
        }
      }

      lastPaintText.value = lastPaintRawText;
      document.querySelector(".lastPaintBar").className = "lastPaintBar fade-in";
    }, 1000);

  } else if (newval == 0) {
    lastPaintRawText = ``;
    lastPaintText.value = lastPaintRawText;
    document.querySelector(".lastPaintBar").className = "lastPaintBar fade-out";
  }
})

watch(canvas.lastPaintMin, (newval) => {
  // console.log("canvas.lastPaintMin  newaval",newval)
  let lastPaintHour = 0;
  if (newval >= 60) {
    lastPaintHour = Math.floor(newval / 60);
    newval = newval % 60;
    if (newval == 0) {
      lastPaintRawText = `${lastPaintHour}小时前“${lastPaintName}”涂色`;  
    } else {
      lastPaintRawText = `${lastPaintHour}小时${newval}分钟前“${lastPaintName}”涂色`;  
    }
    
  } else {
    if (newval == 0) {
      lastPaintRawText = `刚刚“${lastPaintName}”涂色`;
    } else {
      lastPaintRawText = `${newval}分钟前“${lastPaintName}”涂色`;     
    }
  }
  lastPaintText.value = lastPaintRawText;

  let lastpaintBar = document.querySelector(".lastPaintBar");
  console.log("set color :canvas.lastPaintGroup.value",canvas.lastPaintGroup.value);
  if (canvas.lastPaintGroup.value == 1) {
    lastpaintBar.style.backgroundColor = "#00d599";
  } else if (canvas.lastPaintGroup.value == 2) {
    lastpaintBar.style.backgroundColor = "#ffc500";
  }  
})

let showSharePage = ref(false);

let popSharePage = ()=>{
  showSharePage.value = true;
}



let fadeSharePage =()=>{
  showSharePage.value = false;
}

let shareTimer;

let reCDflag = ref(false);

let startTimer=()=>{
  shareTimer = setTimeout(() => {
    // showSharePage.value = false;
    axios.put(`/user/cooling`).then(()=>{
      console.log("send put request");
      reCDflag.value = true;
    }).catch((res)=>{
      console.log(res);
    })
  }, 200);
}

watch(reCDflag,(newval)=>{
  if(newval == true){
    // 请求cd时间
    axios.get(`/user/state`).then((res)=>{
      console.log(res);
      // 刷新时间
      cdtime.getCDtime();

    }).catch((res)=>{
      console.log(res);
    })
    reCDflag = false;
  }
})

let endTimer = ()=>{
  clearTimeout(shareTimer);
}



// !!!!!!如果config对象某个属性的值没变，那么这个值相关就不会重新渲染
// 就是缩放前后设置的x和y没变的话，即使实际拖拽x和y改变了，也不会重新渲染x和y
</script>

<style scoped>
#canvasContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/iamge/canvas_border.png");
  background-size: 100% 100%;
  padding: 8px;
  position: relative;
  z-index: 2;
  /* background-color: #979797;
  background-color: #c8c8c8;
  background-color: #f2f2f2; */
} 


.lastPaintBar {
  visibility: hidden;
  position: absolute;
  overflow: hidden;
  flex-wrap: nowrap;
  white-space:nowrap;
  border-radius: 2px;
  z-index: 2;
  top: 8px;
  left: 8px;
  /* width: 46vw; */
  width: auto;
  padding-left: 2vmin;
  padding-right: 2vmin;
  height: 3vh;
  background-color: rgb(231, 231, 231);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6vh;
  transition: .4s;
}

.fade-in {
  visibility: visible;
	-webkit-animation: fade-in .6s ease-in-out both;
  animation: fade-in .6s ease-in-out both;
}

@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-out {
	-webkit-animation: fade-out .4s ease-in both;
  animation: fade-out .4s ease-in both;
}

@-webkit-keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}


.shareBtn {
  position: absolute;
  width: 3vh;
  height: 3vh;
  right: 8px;
  top: 8px;
  z-index: 2;
}

.shareBtn img {
  width: 100%;
  height: 100%;
}

.sharePage {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: rgba(33, 33, 33, 0.419);
  display: flex;
  justify-content: center;
  align-items: center;
}

.shareBox {
  width: 76vw;
  /* height: 70vh; */
  background-color: white;
  border-radius: 4px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;  
  z-index: 10;
  position: relative;
}

.shareBox img {
  margin-top: 1vh;
  width: 70vw;
  z-index: 10;
}

.shareSaveTips {
  /* position: absolute; */
  /* color: white; */
  /* bottom: -15%; */
  margin-top: 2vmin;
  margin-bottom: 2vmin;
  font-size: 3.3vmin;
  z-index: 11;
}

</style>

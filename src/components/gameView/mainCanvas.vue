<template>
  <div ref="cc" id="canvasContainer">
    <v-stage ref="stage" :config = "configKonva" >
      <v-layer ref="layer" :config="configLayer">

        <v-group ref="Field" :config="configField">
          <v-rect v-for="(square, index) in configSquares " :key="index" :config="square" @touchend="colorEvent" />          
        </v-group>

        <!-- <v-image :config="configImage"></v-image> -->
        <!-- <v-rect :config="a"></v-rect> -->

      </v-layer>
    </v-stage>
  </div>

</template>


<script setup>
import user from "@/modules/userState";
import { toRefs, ref, reactive, defineProps, defineEmits,onMounted,watch  } from "vue";
import canvas from "../../modules/canvasState";
import axios from "../../request/axios";
// import 直接执行

const props = defineProps({
  mode: {
    type: Number,
    default: 0
  },
  drawed: {
    type: Boolean,
  },
});
const { mode,drawed } = toRefs(props);   //得到的props是响应式的
console.log("mode.value:",mode.value);
let emit = defineEmits(['changeMode',"changeDrawState"]);

// 画布缩放
let configLayer = reactive({
  scaleX:1,
  scaleY:1,
})

// 初始化数据
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
onMounted(() => {
  // console.log("canvasContainer", cc.value);  
  // let FieldContext = Field.value.getNode().children[26];用children拿就会乱序
  // console.log(FieldContext);  
  // 用name拿不会乱序
  stage.value.getStage()
    .find(`.square${canvas.latestPosition.value[0] * canvas.squareXnum + canvas.latestPosition.value[1]}`)[0]
    .moveToTop();
  // 首次显示最新格子：进入主页面之前请求，fill时设置stroke，mounted时movetoTop
  console.log(canvas.configSquares);
})



// 更新画布
let drawCanvas=()=>{
  // 更新画布时的draw操作
  // 将[i][j]转换为i*rownum+j

  // 更新整个画布颜色
  for (let i = 0; i < canvas.squareYnum; i++) {
    for (let j = 0; j < canvas.squareXnum; j++) {
      canvas.configSquares[i * canvas.squareXnum + j].fill = canvas.squareColor(
        i,
        j
      );
    }
  }
  // 更新最新格子
    canvas.configSquares[
      canvas.lastPosition.value[0] * canvas.squareXnum +
        canvas.lastPosition.value[1]
    ].stroke = "rgb(200, 200, 200)";  
    canvas.configSquares[
      canvas.latestPosition.value[0] * canvas.squareXnum +
        canvas.latestPosition.value[1]
    ].stroke = "black";

  // 最新格子movetoTop
  stage.value.getStage()
  .find(`.square${canvas.latestPosition.value[0] * canvas.squareXnum + canvas.latestPosition.value[1]}`)[0]
  .moveToTop();
};
let updateCanvas=()=>{
  // 更新画布
  axios
    .get(`/canvas`)
    .then((res) => {
      canvas.canvasState.value = res.data.canvas;
      canvas.lastPosition.value = canvas.latestPosition.value;
      canvas.latestPosition.value = res.data.last_paint.pixel_position;
      console.log(canvas.canvasState.value); 

      drawCanvas();
      console.log("成功刷新画布");
    })
    .catch((res) => {
      console.log("发生错误",res);
    });
};

// 每隔20s获取并刷新一次canvs数据
setInterval(updateCanvas, 20000);
// setInterval里的函数不要用this

// 成功涂色时刷新canvas数据
watch(drawed, (newval) => {
  if (newval == true) {
    updateCanvas();
    emit("changeDrawState", false);
  }
})

let saveSquare = {
  squareName:"square0",
  stroke: "rgb(200, 200, 200)",
  strokeWidth: 2,
};


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

watch(mode, (newval,oldval) => { 
  if (newval == 1) {
    for (let i = 0; i < canvas.squareYnum; i++) {
      for (let j = 0; j < canvas.squareXnum; j++) {
        canvas.configSquares[i*canvas.squareXnum+j].strokeWidth = 2;
      }
    }

    // let FieldContext = Field.value.getNode().children[26];
    // FieldContext.moveToTop();
    // console.log(FieldContext);  
    // stage.value.getStage().find(".square26")[0].moveToTop();
  
  } else if (newval == 0) {

        for (let i = 0; i < canvas.squareYnum; i++) {
      for (let j = 0; j < canvas.squareXnum; j++) {
        canvas.configSquares[i*canvas.squareXnum+j].strokeWidth = 0;
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
// mode ,   user.group ,  canvas.postDrawed


let colorEvent = function (event) {
  console.log("点击了这个格子", event.target.attrs.occupy);
  if (user.group.value != event.target.attrs.occupy) {
    if (mode.value == 1 || mode.value ==2) {
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

      // 将上一个恢复平常
      let lastTarget = stage.value.getStage().find(`.${saveSquare.squareName}`)[0];
      lastTarget.attrs.strokeWidth = saveSquare.strokeWidth;
      lastTarget.attrs.stroke = saveSquare.stroke;
      if (lastTarget.attrs.stroke != "black") {
        lastTarget.moveToBottom();      
      }


      // 存储当前
      let target = stage.value.getStage().find(`.${name}`)[0];    
      saveSquare.squareName = target.attrs.name;
      saveSquare.stroke = target.attrs.stroke;
      saveSquare.strokeWidth = target.attrs.strokeWidth;
      console.log("保存当前的stroke",saveSquare.stroke)

      // 操作当前
      target.moveToTop();    
      target.attrs.strokeWidth = 6;
      target.attrs.stroke = "rgb(200, 200, 200)";




    } else if (mode.value == 0) {
      console.log("modevalue is 0 fail to draw");
    }    
  }

}

canvas.postDrawed();  // 成功请求



// !!!!!!如果config对象某个属性的值没变，那么这个值相关就不会重新渲染
// 就是缩放前后设置的x和y没变的话，即使实际拖拽x和y改变了，也不会重新渲染x和y
</script>

<style scoped>
#canvasContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid black; 
  background-color: #ffffff;
}

</style>

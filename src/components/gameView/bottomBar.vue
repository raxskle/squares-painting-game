<template>
<div class="bar" >
  <div class="btnBox">
    <div class="btn btnleft"  @click="popSituation">战况</div>
    <div class="btncenter" @click="changeMode">
    <div id="drawBtn" class="btncenterChange" >{{drawBtnText}}</div>
    </div>
    <div class="btn btnright"  @click="popTask">任务</div>        
  </div>



</div>

<!-- 任务弹窗 -->
<div class="popupTask" @click="fadeTask">
  <div class="taskWindow" @click.stop="null">
  <h2>任务</h2>
  <p>{{taskText}}</p>  
  </div>
</div>

<!-- 战况弹窗 -->
<div class="popupSituation"  @click="fadeSituation">
  <situation :showSit="showSit" @changeShowSit="changeShowSit"></situation>
</div>

<!-- 涂色成功，涂色冲突失败，涂色冷却中 -->
<div class="popupTips">
  <div class="tipsText">{{tipsText}}</div>
</div>

</template>

<script setup>
import axios from 'axios';
import { toRefs, defineProps, defineEmits,watch,ref } from 'vue';
import user from "../../modules/userState";
import canvas from "../../modules/canvasState";
import situation from "./situation.vue";
import cdtime from "../../modules/cdtime";

let props = defineProps({
  mode: {
    type: Number,
  },
  refresh: {
    type: Boolean,
  },  
})
let { mode } = toRefs(props);
// 设置颜色
let drawColor;
if (user.group.value == 1) {
  drawColor = "#00d599";
} else if (user.group.value == 2) {
  drawColor = "#ffc500";  
} 

// 设置cdtime
let drawBtnText = ref("");
if (user.CDtime.value <= 0) {
  drawBtnText.value = "涂色";
} else if (user.CDtime.value > 0) {
    let CDTimeM = ref(Math.floor(user.CDtime.value / 60));
    let CDTimeS = ref(user.CDtime.value % 60);
    if (CDTimeS.value < 10) {
      CDTimeS.value = `0${CDTimeS.value}`;
    }
    drawBtnText.value = `${CDTimeM.value}:${CDTimeS.value}`;  
}

// cdtime实时更新显示
watch(user.CDtime, (newval) => {
  console.log("cd时间更新");
  if (newval == 0 ||newval<0) {
    drawBtnText.value = "涂色";
  } else {
    let CDTimeM = ref(Math.floor(user.CDtime.value / 60));
    let CDTimeS = ref(user.CDtime.value % 60);
    if (CDTimeS.value < 10) {
      CDTimeS.value = `0${CDTimeS.value}`;
    }
    drawBtnText.value = `${CDTimeM.value}:${CDTimeS.value}`;
  }
  
})

// 涂色成功、失败、冷却提示
let tipsText = ref("");
let popTips = function (text) {
  tipsText.value = text;
  let tips = document.querySelector(".popupTips");
  tips.className="popupTips scale-in-center"
  setTimeout(() => {
    tips.className = "popupTips scale-out-center";
  }, 2000);
}


let emit = defineEmits(['changeMode', "changeRefresh"]);
let changeMode = () => {
  if (mode.value == 1) {
    
    emit("changeMode", 0);  
  } else if (mode.value == 0) {
    // 请求是否能涂色
    axios.get(`/user/state`).then((res) => {
      console.log(res);
      if (res.data.data.state == true && user.CDtime.value<=0) {
        emit("changeMode", 1);
      } else {
        popTips("每位玩家每小时只能涂色一次！");
      }
    }).catch((res) => {
      console.log(res);
    })
  } else if (mode.value == 2) {
    // 发送涂色：选中的格子
    let config = {
      position: canvas.targetSquare.value,
    };
    let drawurl = `/canvas`;
    if (process.env.VUE_APP_develope == "true") {
      drawurl = `/canvaspost`;
    }
    axios.post(drawurl, config).then((res) => {
      console.log(res);
      // 成功涂色就  弹窗成功，回到mode0，请求画布并更新，请求冷却时间
      if (res.data.data.conflicting == false && res.data.data.cooling == false) {
        popTips("涂色成功！");
        console.log("涂色成功！");
        emit("changeMode", 0); 
        emit("changeRefresh", true);
        cdtime.getCDtime();
        // 更新个人等级
        if (res.data.data.is_user_upgraded == true) {
          console.log("user升级了");
          user.level.value = res.data.data.user_level;
        }
        // 更新队伍等级
        if (res.data.data.is_group_upgraded == true) {
          console.log("group升级了")
          if (user.group.value == 1) {
            canvas.group1Level.value = res.data.data.group_level;
          }
          if (user.group.value == 2) {
            canvas.group2Level.value = res.data.data.group_level;
          }          
          user.groupLevel.value = res.data.data.group_level;
        }        

      } else {
        // 涂色失败就  弹窗失败， 回到mode1,请求画布并更新
        if (res.data.data.conflicting == true) {
          popTips("你选择的方格已被你的阵营涂色，请重新选择！");
          console.log("涂色失败，你选择的方格已被你的阵营涂色");
        } else if (res.data.data.cooling == true) {
          popTips("涂色失败，请重试！")
          console.log("涂色失败，同用户一小时内只能涂色一次");
        }
        emit("changeMode", 1);       
        emit("changeRefresh",true);          
      }

    }).catch((res) => {
      console.log(res);
    });
  }

}

// 监视mode改变时改涂色框的颜色
watch(mode, (newval,oldval) => {
  const drawBtn = document.querySelector("#drawBtn");  
  console.log("mode change ", newval);
  if (newval == 1&&oldval ==0) {
    drawBtn.style.backgroundColor = drawColor;    
    drawBtnText.value = "涂色";
  } else if (newval == 0&&oldval==1) {
    drawBtn.style.backgroundColor = "rgb(225, 225, 225)";   
    drawBtnText.value = "涂色";
  } else if (newval == 2) {
    drawBtnText.value = "确认";
  } else if (newval == 0&&oldval == 2) {
    drawBtn.style.backgroundColor = "rgb(225, 225, 225)";
    drawBtnText.value = "涂色";          
  } else if (newval == 1 && oldval == 2) {
    drawBtnText.value = "涂色";      
  }
});

// watch(refresh, (newval) => {
//   // const drawBtn = document.querySelector("#drawBtn");  
//   if (newval == true) {
//     // console.log(111)
//     // drawBtn.style.height = "90px";    
//     // drawBtn.style.width = "90px";    
//     // drawBtn.style.lineHeight = "90px";    
//     // drawBtn.style.borderRadius = "45px";        
//   } else if (newval == false) {
//     setTimeout(() => {
//       // drawBtn.style.height = "76px";    
//       // drawBtn.style.width = "76px";    
//       // drawBtn.style.lineHeight = "76px"; 
//       // drawBtn.style.borderRadius = "38px"; 
//     }, 500);
    
//   }
// })

// 任务
let popTask = ()=>{
  let popup = document.querySelector(".popupTask");
  popup.style.display = "flex";
}
let fadeTask = () => {
  let popup = document.querySelector(".popupTask");
  popup.style.display = "none";  
}
let taskText = ref("默认文字");
// 打开主页面时获取任务
axios.get(`/task`).then((res) => {
  console.log("获取任务：", res);
  taskText.value = res.data.data.task;
}).catch((res) => {
  console.log(res);
})


// 战况
let showSit = ref(false);
let changeShowSit = (val) => {
  showSit.value = val;
}
let popSituation = () => {
  // 战况页面与主页面同步一下
  changeShowSit(true);
  // 在situation组件里控制显示
}
let fadeSituation = () => {
  let popup = document.querySelector(".popupSituation");
  popup.style.display = "none";  
}
</script>


<style scoped>
.bar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  /* position: relative; */
}

.btnBox {
  /* position: absolute; */
  /* border: 4px solid black; */
  width: 80vw;
  height: 85px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: url("@/assets/iamge/controllera.png");
  background-size:  100% 100%;
  background-repeat: no-repeat;
  /* filter: grayscale(100%); */
}

.btn{
  /* border: 3px solid black; */
  z-index: 1;
  width: 32vw;
  height: 12vw;
  line-height: 12vw;
  text-align: center;
  font-size: 20px;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 4px;
}

.btncenter {
  position: absolute;
  z-index: 2;
  height: 92px;
  width: 92px;  
  /* border: 4px solid black; */
  /* border-radius: 49px; */
  /* background-color: rgba(255, 255, 255, 0); */
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/iamge/controllerb.png");
  background-size:  100% ;
  background-repeat: no-repeat;
}

.btncenterChange {
  background-color: rgb(225, 225, 225);
  height: 74px;
  width: 74px;   
  line-height: 74px;  
  font-size: 24px;  
  border-radius: 37px;  
  text-align: center;
  transition: .5s;
}

.btnleft {
  margin-right: 30px;
}


.btnright {
  margin-left: 30px;
}


.popupTask {
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.448);
  z-index: 10;
}

.taskWindow{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 70vw;
  height: 50vh;
  background-color: white;
  border: 4px solid black;
  padding: 10px;
  font-size: 20px;
  border-radius: 4px;
}

.taskWindow h2 {
  margin: 0;
}

.popupSituation {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0; 
  /* 让它从网页的top 0 开始 */
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-image: url("@/assets/iamge/background.jpg");
  background-size: 100vw;
  background-repeat: repeat-y;
}

.popupTips{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  width: 200px;
  height: 60px;
  border: 3px solid black;
  /* border-radius: 2px; */
  background-color: rgb(255, 255, 255);
  top: 450px;
  transition: all .5s;
  opacity: 0;
  padding: 5px;
  z-index: -1;
}

/* .popanime {
  z-index: 10;
  visibility: visible;  
  opacity: 1;
  transition: all .5s;
} */

.scale-in-center {
  z-index: 10;
  visibility: visible;  
  opacity: 1;
	-webkit-animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}
@keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}

.scale-out-center {
  z-index: -1;
  visibility: hidden;  
	-webkit-animation: scale-out-center 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  animation: scale-out-center 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@-webkit-keyframes scale-out-center {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
  60% {
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
}
@keyframes scale-out-center {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
  60% {
    opacity: 0;    
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
}

.tipsText {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
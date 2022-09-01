<template>
  <div class="guideView fade-in" >
    <div class="guide">
      <userInfo :logo="topLogoImg"  :clickable="false" :class="userInfoH"></userInfo>
      <!-- <mainCanvas :mode="mode" :refresh="refresh" @changeMode="changeMode" @changeRefresh="changeRefresh" ></mainCanvas>     -->
      <!-- <bottomBar :mode="mode" :refresh="refresh" @changeMode="changeMode" @changeRefresh="changeRefresh" ></bottomBar>     -->

      <div class="canvasContainer" >
        <div class="canvas">
          <img :src="guideImg"/>
        </div>
      </div>

      <div class="bar" >
        <div class="btnBox">
          <div class="btn btnleft"  >战况</div>
          <div class="btncenter">
          <div id="drawBtn" class="btncenterChange" >{{drawBtnText}}</div>
          </div>
          <div class="btn btnright"  >任务</div>        
        </div>
      </div>

      <footerAD></footerAD>   
    </div>

    <div class="guideBox">
      <div class="window"  @touchend="toguideforward"  @touchmove="toguide3"></div>    
      <div class="guideText">{{guidewords}}</div>      
    </div>      

    <div class="gloaderwarp">
    <div class="loader">进入游戏中…</div>  
  </div>  

  </div>


</template>
  
<script setup>
import {  ref, watch } from "vue";
// import mainCanvas from '../components/gameView/mainCanvas.vue'
// import bottomBar from '../components/gameView/bottomBar.vue'
import userInfo from '../components/gameView/userInfo.vue'
import footerAD from "../components/footerAD.vue"
import user from "@/modules/userState"
import router from "@/router";



let guidePage = ref(1);
let userInfoH = "userInfoH";
// top的logo根据阵营显示
let topLogoImg = ref(null);
// 没有group就跳回loading
if (user.group.value == 0) {
  router.replace("/loading");
} else if (user.group.value == 1) {
  topLogoImg.value = require(`@/assets/iamge/greenlogo.png`);
} else if (user.group.value == 2) {
  topLogoImg.value = require(`@/assets/iamge/yellowlogo.png`);  
}

let drawBtnText = ref("填色");
let drawColor;
let guidewords = ref("点击画布或“填色”按钮")
if (user.group.value == 1) {
  drawColor = "#00d599";
} else if (user.group.value == 2) {
  drawColor = "#ffc500";  
} 
let guideImg = ref(require(`@/assets/iamge/guide01.png`));
//

let wait = () =>{
  document.querySelector(".guideBox").className = "guideBox fade-out";
  setTimeout(() => {
    document.querySelector(".guideBox").className = "guideBox fade-in";    
  }, 300);

}

let toguide3flag = true;
// 防抖
let toguideforward = () => {
  if (guidePage.value == 1) {
    guidePage.value = 2;    
  }else if (guidePage.value == 3 && toguide3flag == true) {
    guidePage.value = 4;       
  }else if (guidePage.value == 4) {
    guidePage.value = 5;
  } else if (guidePage.value == 6) {
    guidePage.value = 7;
  }else if (guidePage.value == 7) {
    guidePage.value = 8;
  }else if (guidePage.value == 8) {
    guidePage.value = 9;
  } else if (guidePage.value == 9) {
    document.querySelector(".guide").className = "guide fade-out";
    document.querySelector(".guideBox").className = "guideBox fade-out";
    document.querySelector(".window").ontouchend = null;

    setTimeout(() => {
      document.querySelector(".guide").style.display = "none";      
      document.querySelector(".guideBox").style.display = "none";      
      document.querySelector(".gloaderwarp").style.display = "flex";      
    }, 300);
    setTimeout(() => {
      router.replace("/game");
    }, 400);
    
  }
}

let toguide3 = (e) => {
  if (guidePage.value == 2 && e.changedTouches.length > 0) {
    toguide3flag = false;    
    guidePage.value = 3; 
    setTimeout(() => {
      toguide3flag = true;
    }, 600);
  }
}


watch(guidePage, (newval) => {
  console.log(newval);
  const window = document.querySelector(".window");
  const guideBox = document.querySelector(".guideBox");
  const text = document.querySelector(".guideText");
  if (newval == 2) {
    guideImg.value = require(`@/assets/iamge/guide02.png`);
    document.querySelector(".btncenterChange").style.backgroundColor = drawColor;
    wait();
    window.style.width = "85vw";
    window.style.height = "50vh";
    guidewords.value ="试试双指缩放画布吧！"
  } else if (newval == 3) {
    guideImg.value = require(`@/assets/iamge/guide03.png`);
    window.style.width = "25vmin";
    window.style.height = "25vmin";
    guideBox.style.top = "40vh";
    guidewords.value ="选择要涂色的格子"
    wait();
  } else if (newval == 4) {
    guideImg.value = require(`@/assets/iamge/guide04.png`);
    window.style.width = "20vh";
    window.style.height = "20vh";
    guideBox.style.flexDirection = "column-reverse";    
    guideBox.style.height = "40vh";
    guideBox.style.top = "58vh";
    // guideBox.style.bottom = "0";
    guidewords.value ="点击确认填色"    
    wait();
    drawBtnText.value = "确认";  
  } else if (newval == 5) {
    if (user.group.value == 1) {
    guideImg.value = require(`@/assets/iamge/guide05.png`);      
    } else if (user.group.value == 2) {
      guideImg.value = require(`@/assets/iamge/guide052.png`);        
    }

    document.querySelector(".btncenterChange").style.backgroundColor = "rgb(225, 225, 225)";
    drawBtnText.value = "冷却";
    text.style.opacity = 0;
    wait();
    setTimeout(() => {
      guidePage.value = 6;
      text.style.opacity = 1;
      
    }, 1400);
  } else if (newval == 6) {
    // guideImg.value = require(`@/assets/iamge/guide01.png`);
    window.style.width = "20vh";
    window.style.height = "20vh";
    guideBox.style.flexDirection = "column-reverse";    
    guideBox.style.height = "40vh";
    guideBox.style.top = "58vh";
    guidewords.value ="一小时后才可以再次涂色"    
    // wait();
  } else if (newval == 7) {
    guideImg.value = require(`@/assets/iamge/guide01.png`);
    window.style.width = "20vh";
    window.style.height = "16vh";
    guideBox.style.flexDirection = "column-reverse";    
    guideBox.style.alignItems = "flex-end";    
    guideBox.style.height = "40vh";
    guideBox.style.top = "58vh";
    guideBox.style.right = "5vw";
    guidewords.value ="查看当日任务（每日更新）"  
    wait();
  } else if (newval == 8) {
    window.style.width = "20vh";
    window.style.height = "16vh";
    guideBox.style.flexDirection = "column-reverse";    
    guideBox.style.alignItems = "flex-start";    
    guideBox.style.height = "40vh";
    guideBox.style.top = "58vh";
    guideBox.style.left = "5vw";
    guideBox.style.right = "";
    guidewords.value ="查看目前两队战况"  
    guideImg.value = require(`@/assets/iamge/guide01.png`);
    wait();
  } else if (newval == 9) {
    window.style.width = "60vw";
    window.style.height = "14vh";
    guideBox.style.flexDirection = "column";    
    guideBox.style.alignItems = "flex-start";    
    guideBox.style.height = "30vh";
    guideBox.style.top = "0vh";
    guideBox.style.left = "";
    guideBox.style.right = "";
    guidewords.value ="点击名字看看自己的等级吧！"  
    guideImg.value = require(`@/assets/iamge/guide01.png`);
    wait();
  }
})

</script>

<style scoped>
.guideView {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/iamge/background.jpg");
  background-size: 100vw;
  /* background-color: transparent; */
  position: relative;
  transition: 1s all;
  /* filter: brightness(50%); */
}


.guide {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;  
  width: 100%;
  height: 100%;
  /* background-color: transparent; */
  /* position: relative; */
  /* filter: brightness(50%); */
}


/* 
.userInfoH { */
  /* filter: brightness(50%); */
/* } */
.canvasContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/iamge/canvas_border.png");
  background-size: 100% 100%;
  padding: 8px;
  /* background-color: #979797;
  background-color: #c8c8c8;
  background-color: #f2f2f2; */
} 


.canvas{
  width: 90vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.canvas img {
  width: 100%;
}

.bar {
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 13vh;
/* position: relative; */
}

.btnBox {
  /* position: absolute; */
  /* border: 4px solid black; */
  width: 80vw;
  height: 12vh;
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
  font-size: 2.6vh;
  background-color: rgba(255, 255, 255, 0);
}

.btncenter {
  position: absolute;
  z-index: 2;
  height: 12vh;
  width: 12vh;  
  /* border: 4px solid black; */
  /* border-radius: 49px; */
  /* background-color: rgba(255, 255, 255, 0); */
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/iamge/controllerb.png");
  background-size:  100% 100%;
  background-repeat: no-repeat;
}

.btncenterChange {
  background-color: rgb(225, 225, 225);
  height: 9vh;
  width: 9vh;   
  line-height: 9vh;  
  font-size: 3vh;  
  border-radius: 50%;  
  text-align: center;
  transition: .5s;
}

.btnleft {
  margin-right: 7.5vmin;
}


.btnright {
  margin-left: 7.5vmin;
}


.fade-in {
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
	-webkit-animation: fade-out .3s ease-in-out both;
  animation: fade-out .3s ease-in-out both;
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
.guideBox {
  z-index: 3;  
  position: absolute;
  top: 22vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: .6s all;

}
.window {
  width: 75vw;
  height: 45vh;
  z-index: 4; 
  border-radius: 4vmin; 
  box-shadow: rgba(0, 0, 0, 0.481) 0  0  0  100vh;  
  position: relative;
}

.window::before {
  content: "";
  position: absolute;
  bottom: -2vmin;
  z-index: 6;
  right: -2vmin;
  width: 9vmin;
  height: 9vmin;
  background-image: url("@/assets/iamge/pointto.png");
  background-size: 100% 100%;
}

.guideText {
  width: 55vw;
  height: 10vh;
  z-index: 4;
  margin-top: 2vh;
  margin-bottom: 2vh;
  padding: 0.2vh;
  border-radius: 2px;
  background-color: rgb(255, 255, 255);
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vmin;
  transition: .5s all;
}


.gloaderwarp {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow:1;
  width: 100%;
  height: 100%;  
}

.loader {
  width: 60vw;
  height: 200px;
  font-size: 5vmin;
  display: flex;
  justify-content: center;
  align-items: center;  
	-webkit-animation: load .8s infinite;
  animation: load .8s infinite;
}

@-webkit-keyframes load {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes load {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

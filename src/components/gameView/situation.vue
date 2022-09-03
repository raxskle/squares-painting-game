<template>
<div class="situation">
  <div class="scoreBar">
    <div class="gridBorder"></div>
    <div class="scoreTitle">已涂色块数目</div>
    <div class="scoreBox">
      <div class="scoreGroup">
        <div class="groupName">射日队</div>
        <div class="groupImg"><img src="@/assets/iamge/yellowlogo.png"/></div>
        <div class="groupNum">{{canvas.group2Num}}</div>
      </div>
      <div class="vs">VS</div>
      <div class="scoreGroup">
        <div class="groupName">偷瓜队</div>
        <div class="groupImg"><img src="@/assets/iamge/greenlogo.png"/></div>
        <div class="groupNum">{{canvas.group1Num}}</div>        
      </div>
    </div>
    <div class="gridBorder"></div>
  </div>
  <!-- scoreBar 24vh -->
  <div class="wholeView">
    <div  id="canvasContainer">
      <v-stage ref="stage" :config = "configKonva">
        <v-layer ref="layer" :config="configLayer">
          <v-group ref="Field" :config="configField">
            <v-rect v-for="(square, index) in SconfigSquares " :key="index" :config="square"/>          
          </v-group>
        </v-layer>
      </v-stage>
    </div> 
    <div class="clickToFade"  @click="fade"></div> 
  </div>
  <!-- wholeView 最大60vh -->

  <div class="returnTips">点击任意地方返回</div>
  <div class="bottomBar">
    <div class="gridBorder"></div>
    <div class="scrollBar">
      <p class="animate">{{scrollText}}</p>
    </div>     
    <div class="gridBorder"></div>
  
  </div>
  <footerAD></footerAD>   
</div>

</template>

<script setup>
import { reactive,ref,toRefs, defineProps, defineEmits,watch } from "vue";
import canvas from "../../modules/canvasState";
import footerAD from "../footerAD.vue";

let props = defineProps({
  showSit: {
    type: Boolean,
  },
})
let { showSit } = toRefs(props);


let emit = defineEmits(['changeShowSit']);



// 画布缩放
let configLayer = reactive({
  scaleX:1,
  scaleY:1,
})
let SconfigSquares = [];
// square原稿大小
for (let i of canvas.configSquares) {
  SconfigSquares.push(
    reactive({
    x: i.x,
    y: i.y,
    width: i.width,
    height: i.height,
    fill: i.fill,    
  }))
}

let copyConfigSquares = () => {
  // for (let i of canvas.configSquares) {
  //   SconfigSquares.fill = i.fill;  
  //   // console.log("战况页 每个格子",SconfigSquares.fill, i.fill); 
  // } 

  for (let i = 0; i < canvas.squareYnum; i++) {
    for (let j = 0; j < canvas.squareXnum; j++) {
      // 更新所有格子颜色
      SconfigSquares[i * canvas.squareXnum + j].fill = canvas.configSquares[i * canvas.squareXnum + j].fill;
    }
  }
}

let configField = reactive({
  x:0,
  y:0,
  scaleX:canvas.configField.scaleX,
  scaleY: canvas.configField.scaleX,
});
let configKonva = reactive({
  width: canvas.fieldWidth*canvas.fieldScale0,
  height: canvas.fieldHeight*canvas.fieldScale0,
});

watch(showSit, (newval) => {
  if (newval == true) {
    // 同步
    copyConfigSquares();
    // console.log("战况页面更新");
    let popup = document.querySelector(".popupSituation");
    popup.style.display = "flex";     
    emit("changeShowSit", false);
  }
})



let fade = () => {
  let popup = document.querySelector(".popupSituation");
  popup.style.display = "none";
}


// 设置播报文字
let day2 = 1662480000000;
let daynow = Date.now();
console.log("day2", day2);
console.log("daynow", daynow);
let scrollText = ref("");
if (canvas.group1CompleteTarget.value == true && canvas.group2CompleteTarget.value == true) {
  scrollText.value = "偷瓜队已完成目标拼图！   射日队已完成目标拼图！";
} else if (canvas.group1CompleteTarget.value == true) {
  scrollText.value = "偷瓜队已完成目标拼图！";
} else if (canvas.group2CompleteTarget.value == true) {
  scrollText.value = "射日队已完成目标拼图！";  
} else {
  if (daynow < day2) {
    scrollText.value = "涂色更多的一队在明天可以获得特制头像框哦";       
  } else {
    scrollText.value = "";   
  }
}  

watch(canvas.group1CompleteTarget, (newval) => {
  if (newval == true) {
    if (canvas.group2CompleteTarget.value == true) {
      scrollText.value = "偷瓜队已完成目标拼图！   射日队已完成目标拼图！";      
    } else {
      scrollText.value = "偷瓜队已完成目标拼图！";
    }
  }
})

watch(canvas.group2CompleteTarget, (newval) => {
  if (newval == true) {
    if (canvas.group1CompleteTarget.value == true) {
      scrollText.value = "偷瓜队已完成目标拼图！  射日队已完成目标拼图！";      
    } else {
      scrollText.value = "射日队已完成目标拼图！";      
    }
  }
})


</script>

<style scoped>

.situation {
  width: 100vw;
  height: 100vh;
  z-index: 30;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  /* position: absolute; */
  /* background-color: antiquewhite; */
}
.scoreBar {
  width: 100vw;
  height: 24vh;
  background-color: #ffffff6b;
  /* border-top: 2px solid black; */
  /* border-bottom: 2px solid black; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.scoreTitle {
  width: 40%;
  height: 4vh;
  margin-top: 0.5vh;
  border: 2px solid black;
  font-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;  
  background-color: #ffffff;
  border-radius: 2px;
}
.scoreBox {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center; 
  /* flex-grow: 1;  */
  width: 100%;
  height: 16vh;
  /* margin-bottom: 10px; */
}

.vs {
  font-size: 10vmin;
}

.groupName{
  font-size: 2.2vh;
}

.groupNum {
  font-size: 2.2vh;
}

.scoreGroup {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* justify-content: flex-start; */
  align-items: center; 
  height: 16vh;
  width: 20vmin;

}

/* .groupName {

} */

.groupImg {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;
}
.groupImg img {
  height: 8vh;
}
/* 
.groupNum{

} */


.wholeView {
  /* background-color: rgb(255, 255, 255); */
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 62vh;
}



#canvasContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/iamge/situation_border.png");
  background-size:  100% 100%;
  background-repeat: no-repeat;
  margin-top: 0.2vh;
  padding: 10px;
}

.clickToFade {
  position: absolute;
  z-index: 10;
  width: 100vw;
  height: 100%;
  background-color: transparent;
}


.bottomBar {
  margin-top: 0.2vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.returnTips {
  font-size: 4vmin;
  color: rgb(70, 70, 70);
  /* margin-bottom: 0.6vmin; */
}

.gridBorder {
  height: 10px;
  width: 100vw;
  background-image: url("@/assets/iamge/gridborder.png");
  background-size: 100% 100% ;
}


.scrollBar {
  width: 100vw;
  height: 7vmin;
  margin: 0;
  /* border-top: 2px solid black; */
  /* border-bottom: 2px solid black; */
  overflow: hidden;
  background-color: white;
  text-align: center;

}

.animate {
    font-size: 5vmin;
    margin: 0;
    line-height: 7vmin;
    color: #000;
    display: inline-block;
    white-space: nowrap;
    animation: 8s wordsLoop linear infinite normal;
}

@keyframes wordsLoop {
    0% {
        transform: translateX(180%);
        -webkit-transform: translateX(180%);
    }
    100% {
        transform: translateX(-180%);
        -webkit-transform: translateX(-180%);
    }
}

@-webkit-keyframes wordsLoop {
    0% {
        transform: translateX(180%);
        -webkit-transform: translateX(180%);
    }
    100% {
        transform: translateX(-180%);
        -webkit-transform: translateX(-180%);
    }
}


</style>
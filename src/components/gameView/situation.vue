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
  
  <div class="wholeView">
    <div  id="canvasContainer">
      <v-stage ref="stage" :config = "configKonva" >
        <v-layer ref="layer" :config="configLayer">
          <v-group ref="Field" :config="configField">
            <v-rect v-for="(square, index) in SconfigSquares " :key="index" :config="square"/>          
          </v-group>
        </v-layer>
      </v-stage>
    </div> 
    <div class="clickToFade"  @click="fade"></div> 
  </div>
  <div class="bottomBar">
    <div class="gridBorder"></div>
    <div class="scrollBar">
      <p class="animate">射日队已完成拼图!</p>
    </div>     
    <div class="gridBorder"></div>
  </div>

  <footerAD></footerAD> 
  
</div>

</template>

<script setup>
import { reactive  } from "vue";
import canvas from "../../modules/canvasState";
import footerAD from "../footerAD.vue";
import { toRefs, defineProps, defineEmits,watch } from 'vue';

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
  for (let i of canvas.configSquares) {
    SconfigSquares.fill = i.fill;  
    console.log("战况页 每个格子",SconfigSquares.fill, i.fill); 
  }  
}

let configField = {
  x:0,
  y:0,
  scaleX:canvas.configField.scaleX,
  scaleY: canvas.configField.scaleX,
};
let configKonva = {
  width: canvas.fieldWidth*canvas.fieldScale0,
  height: canvas.fieldHeight*canvas.fieldScale0,
};

watch(showSit, (newval) => {
  if (newval == true) {
    // 同步
    copyConfigSquares();
    console.log("战况页面更新");
    let popup = document.querySelector(".popupSituation");
    popup.style.display = "flex";     
    emit("changeShowSit", false);
  }
})



let fade = () => {
  let popup = document.querySelector(".popupSituation");
  popup.style.display = "none";
}




</script>

<style scoped>

.situation {
  width: 100vw;
  height: 100%;
  /* position: absolute; */
  /* background-color: antiquewhite; */
}
.scoreBar {
  width: 100vw;
  height: 24vh;
  /* border-top: 2px solid black; */
  /* border-bottom: 2px solid black; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.scoreTitle {
  width: 40%;
  height:20%;
  margin-top: 5px;
  border: 2px solid black;
  font-size: 24px;
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
  flex-grow: 1; 
  width: 100%;
  margin-bottom: 10px;
}

.vs {
  font-size: 40px;
}

.scoreGroup {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; 
  height: 100%;
  width: 80px;

}

/* .groupName {

} */

.groupImg {
  display: flex;
  justify-content: center;
  align-items: center;
}
.groupImg img {
  width: 75%;
}
/* 
.groupNum{

} */


.wholeView {
  /* background-color: rgb(255, 255, 255); */
  display: flex;
  justify-content: center;
  align-items: center;
  /* max-height: 50vh; */
}



#canvasContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/iamge/situation_border.png");
  background-size:  100% 100%;
  background-repeat: no-repeat;
  margin-top: 10px;
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
  margin-top: 10px;
}

.gridBorder {
  height: 10px;
  width: 100vw;
  background-image: url("@/assets/iamge/gridborder.png");
  background-size: 100% 100% ;
}


.scrollBar {
  width: 100vw;
  height: 45px;
  margin: 0;
  /* border-top: 2px solid black; */
  /* border-bottom: 2px solid black; */
  overflow: hidden;
  background-color: white;

}

.animate {
    font-size: 20px;
    margin: 0;
    line-height: 45px;
    color: #000;
    display: inline-block;
    white-space: nowrap;
    animation: 8s wordsLoop linear infinite normal;
}

@keyframes wordsLoop {
    0% {
        transform: translateX(140%);
        -webkit-transform: translateX(140%);
    }
    100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
}

@-webkit-keyframes wordsLoop {
    0% {
        transform: translateX(100%);
        -webkit-transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
}


</style>
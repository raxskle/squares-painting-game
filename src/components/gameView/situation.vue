<template>
<div class="situation">
  <div class="scoreBar">
    <div class="gridBorder"></div>
    <div class="scoreTitle">已涂色块数目</div>
    <div class="scoreBox">




      <div class="scoreGroup">
        <div class="groupNameImg">
          <div class="groupImg"><img src="@/assets/iamge/yellowlogo.png"/></div>
          <div class="groupName"> &nbsp; 射日队</div>
        </div>     
        
        <div class="groupNameImg">
          <div class="groupName">偷瓜队 &nbsp;</div>
          <div class="groupImg"><img src="@/assets/iamge/greenlogo.png"/></div>          
        </div>        
      </div>

      <div class="vsBox">
        <div class="groupNum">{{canvas.group2Num}}</div>
        <div class="vs">VS</div>  
        <div class="groupNum">{{canvas.group1Num}}</div>        
      </div>



    </div>
    <div class="gridBorder"></div>
  </div>
  <!-- scoreBar 24vh -->
  <div class="wholeView">
    <!-- <div  id="canvasContainer">
      <v-stage ref="stage" :config = "configKonva">
        <v-layer ref="layer" :config="configLayer">
          <v-group ref="Field" :config="configField">
            <v-rect v-for="(square, index) in SconfigSquares " :key="index" :config="square"/>          
          </v-group>
        </v-layer>
      </v-stage>
    </div> 
    <div class="clickToFade"  @click="fade"></div>  -->
    <div class="rankingTitle">累计排行榜</div>
    <div class="rangkingWarp">
      <rankingList v-if="showRanking" ></rankingList>      
    </div>
  </div>


  <!-- wholeView 最大60vh -->


  <div class="bottomBar">
    <div class="gridBorder"></div>
    <div class="scrollBar">
      <p class="animate">{{scrollText}}</p>
    </div>     
    <div class="gridBorder"></div>
  
  </div>
  <div class="returnTips">点击任意地方返回</div>
</div>

</template>

<script setup>
import { ref, toRefs, defineProps, defineEmits, watch } from "vue";
// import { reactive} from "vue";
import rankingList from "./rankingList.vue";
import canvas from "../../modules/canvasState";
// import footerAD from "../footerAD.vue";

let props = defineProps({
  showSit: {
    type: Boolean,
  },
})
let { showSit } = toRefs(props);


let emit = defineEmits(['changeShowSit']);


let showRanking = ref(true);




// // 画布缩放
// let configLayer = reactive({
//   scaleX:1,
//   scaleY:1,
// })
// let SconfigSquares = [];
// // square原稿大小
// for (let i of canvas.configSquares) {
//   SconfigSquares.push(
//     reactive({
//     x: i.x,
//     y: i.y,
//     width: i.width,
//     height: i.height,
//     fill: i.fill,    
//   }))
// }

// let copyConfigSquares = () => {
//   // for (let i of canvas.configSquares) {
//   //   SconfigSquares.fill = i.fill;  
//   //   // console.log("战况页 每个格子",SconfigSquares.fill, i.fill); 
//   // } 

//   for (let i = 0; i < canvas.squareYnum; i++) {
//     for (let j = 0; j < canvas.squareXnum; j++) {
//       // 更新所有格子颜色
//       SconfigSquares[i * canvas.squareXnum + j].fill = canvas.configSquares[i * canvas.squareXnum + j].fill;
//     }
//   }
// }

// let configField = reactive({
//   x:0,
//   y:0,
//   scaleX:canvas.configField.scaleX,
//   scaleY: canvas.configField.scaleX,
// });
// let configKonva = reactive({
//   width: canvas.fieldWidth*canvas.fieldScale0,
//   height: canvas.fieldHeight*canvas.fieldScale0,
// });

watch(showSit, (newval) => {
  if (newval == true) {
    // 同步
    // copyConfigSquares();
    // console.log("战况页面更新");
    let popup = document.querySelector(".popupSituation");
    popup.style.display = "flex";     
    emit("changeShowSit", false);
  }
})



// let fade = () => {
//   let popup = document.querySelector(".popupSituation");
//   popup.style.display = "none";
// }


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
  position: relative;

  /* position: absolute; */
  /* background-color: antiquewhite; */
}
.scoreBar {
  margin-top: 1vh;
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
  width: 60%;
  height: 4vh;
  /* margin-top: 0.2vh; */
  font-size: 3.5vh;
  display: flex;
  justify-content: center;
  align-items: center;  
  /* background-color: #ffffff; */
  border-radius: 2px;
}
.scoreBox {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center; 
  /* flex-grow: 1;  */
  width: 100%;
  height: 16vh;
  /* margin-bottom: 10px; */
}

.vs {
  font-size: 7vmin;
}

.groupName{
  font-size: 2.2vh;
}

.groupNum {
  font-size: 6vh;
}

.scoreGroup {
  margin-top: 1vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* justify-content: flex-start; */
  align-items: center; 
  height: 6vh;
  width: 100vmin;

}

.vsBox{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  width: 90%;
}

.groupNameImg{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.groupImg {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6vh;
}
.groupImg img {
  height: 6vh;
}
/* 
.groupNum{

} */


.wholeView {
  /* background-color: rgb(255, 255, 255); */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 62vh;
  position: relative;
  width: 95vw;
}

.rangkingWarp {
  height: 47vh;
  margin-bottom: 4vh;
  width: 90vw;
  padding-left: 2vw;
  padding-right: 2vw;
  margin-left: 2vw;
  margin-right: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rankingTitle {
  font-size: 3.5vh;
  margin-bottom: 1vh;
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
  margin-top: 1vh;
  margin-bottom: 2vh;
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
  height: 7.2vmin;
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
<template>
<div class="gameView ">
  <div class="game fade-in">
    <topUserInfo :logo="topLogoImg" ></topUserInfo>
    <mainCanvas :mode="mode" :refresh="refresh" @changeMode="changeMode" @changeRefresh="changeRefresh" ></mainCanvas>    
    <bottomBar :mode="mode" :refresh="refresh" @changeMode="changeMode" @changeRefresh="changeRefresh" ></bottomBar>    
    <footerAD></footerAD>
    <!--
      -top  15vh
      -maincanvas 62vh
      -AD  7vh
      bottom 13vh
      -->
  </div>

  <!-- <div class="showWinCard1Warp showingCard1">
    <div class="showWinCard1">青铜哦，再接再厉！</div>
  </div> -->
</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import mainCanvas from '../components/gameView/mainCanvas.vue'
import bottomBar from '../components/gameView/bottomBar.vue'
import topUserInfo from '../components/gameView/topUserInfo.vue'
import footerAD from "../components/footerAD.vue"
import user from "@/modules/userState"
import router from "@/router";
// import "../request/axios"

let mode = ref(0);
let refresh = ref(false);
// mode控制涂色，mode1能涂色，mode0不能
// refresh == true 时刷新画布
let changeMode = (num) => {
  mode.value = num;
  // console.log("change mode to ", mode.value);
};
let changeRefresh = (val) => {
  refresh.value = val;
};

// top的logo根据阵营显示
let topLogoImg = ref(null);

// 没有group就跳回loading
if (user.group.value == 0) {
  // console.log("到game主页面，但是没选择group")
  router.replace("/loading");
} else if (user.group.value == 1) {
  topLogoImg.value = require(`@/assets/iamge/greenlogo.png`);
} else if (user.group.value == 2) {
  topLogoImg.value = require(`@/assets/iamge/yellowlogo.png`);  
}

let situationBorder = new Image();
situationBorder.src = require(`@/assets/iamge/situation_border.png`); 
let wincard0 = new Image();
wincard0.src = require(`@/assets/iamge/win_card0.png`);


onMounted(() => {
  console.log("gameView onMounted");
})

</script>

<style scoped>


.gameView {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/iamge/background.jpg");
  background-size: 100vw;
  position: relative;

}

.game {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;  
  width: 100%;
  height: 100%;
  /* position: relative; */
}

.fade-in {
	-webkit-animation: fade-in .4s ease-in both;
  animation: fade-in .4s ease-in both;
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


.showWinCard1Warp {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.547);
}

.showWinCard1 {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 16vh;
  height: 23vw;
  width: 90vw;
  background-image: url("@/assets/iamge/win_card1.png");
  background-size: 100% 100%;  
  animation: showingcard 2s infinite;   
}

.showingCard1 {
  display: flex;
}



@keyframes showingcard {
  0% {
    filter: drop-shadow(0 0 2vw #ffb520aa);      
  }
  50% {
    filter: drop-shadow(0 0 15vw #ffb520aa);      
  }
  100% {
    filter: drop-shadow(0 0 2vw #ffb520aa);       
  }
}

</style>

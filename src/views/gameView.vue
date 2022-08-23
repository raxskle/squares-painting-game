<template>
<div class="gameView">
  <div class="game">
    <topUserInfo :logo="topLogoImg" :img="require(`@/assets/iamge/greenlogo.png`)"></topUserInfo>
    <mainCanvas :mode="mode" :refresh="refresh" @changeMode="changeMode" @changeRefresh="changeRefresh" ></mainCanvas>    
    <bottomBar :mode="mode" :refresh="refresh" @changeMode="changeMode" @changeRefresh="changeRefresh" ></bottomBar>    
  </div>
  

  <footerAD></footerAD>  
</div>
</template>

<script setup>
import { ref } from "vue";
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
  console.log("change mode to ", mode.value);
};
let changeRefresh = (val) => {
  refresh.value = val;
};


// top的logo根据阵营显示
let topLogoImg = ref(null);
console.log("在gameView时的group", user.group.value);

// 没有group就跳回loading
if (user.group.value == 0) {
  console.log("到game主页面，但是没选择group")
  router.replace("/loading");
} else if (user.group.value == 1) {
  topLogoImg.value = require(`@/assets/iamge/greenlogo.png`);
} else if (user.group.value == 2) {
  topLogoImg.value = require(`@/assets/iamge/yellowlogo.png`);  
}


</script>

<style scoped>
.gameView {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/iamge/background.jpg");
  background-size: 100vw;
  position: relative;

}

.game {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex-grow: 1;  
  /* position: relative; */
}
</style>

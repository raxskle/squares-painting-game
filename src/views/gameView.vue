<template>
<div class="gameView">
  <div class="game">
    <topUserInfo></topUserInfo>
    <mainCanvas :mode="mode"  @changeMode="changeMode"></mainCanvas>    
    <bottomBar :mode="mode" @changeMode="changeMode"></bottomBar>    
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
// import "../request/axios"
console.log("已经加载了gameView");

let mode = ref(0);
// mode控制涂色，mode1能涂色，mode0不能
let changeMode = (num) => {
  mode.value = num;
  console.log("change mode to ", mode.value);
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
  background-image: url("D:/MyWeb/byproject/bypixel/src/assets/iamge/background.jpg");
  background-size: 100vw;
}

.game {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex-grow: 1;  
}
</style>

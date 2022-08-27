<template>
<userInfo :logo="logo"  :clickable="true"></userInfo>

<!-- 点称号显示弹窗 -->
<div class="popupWinerPage" >
  <winnerPage  :logo="logo"></winnerPage>
</div>

</template>

<script setup>
import { toRefs,defineProps } from "vue";
// import user from "../../modules/userState";
// import canvas from "../../modules/canvasState";s
import userInfo from "./userInfo.vue"
import winnerPage from "./winnerPage.vue"

const props = defineProps({
  logo: {}
});
const {logo} = toRefs(props);





</script>

<style scoped>
.infoBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 15vh; 
  width: 95%;
}

.userInfo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

}

.infoImg{
  display: flex;
  justify-content: center;
  align-items: center;
}

.userImg {
  width: 46%;
  border-radius: 50%;
  border: 2px solid black;
}

.headFrame{
  height: 12vh;
  width: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: antiquewhite; */
  /* background-image: url("@/assets/iamge/green_frame.png"); */
  /* background-image: url("@/assets/iamge/yellow_frame.png"); */
  background-size: 100%;
  margin-right: 4px;

}


.infoText {
  max-width: 35vw;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 12px;
  padding-right: 12px;
  background-color: rgb(255, 255, 255);
  /* display: flex;
  justify-content: center;
  align-items: center; */
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  border: 2px solid black;
}


.groupLogo {
  height: 10vh;
}

.groupLogo img {
  height: 100%;
}

.popupWinerPage {
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/iamge/background.jpg");
  background-size: 100% ;
  background-repeat: repeat;
  z-index: 10;
}



</style>

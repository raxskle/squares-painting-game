<template>
<div class="infoBox">
  <div class="userInfo">
    <div class="infoImg"><img :src="user.userImg" /></div>
    <div class="infoText" @click="pop"><p>{{user.userName.value}}</p></div>
  </div>


  <div class="groupLogo"><img :src="logo" /></div>
</div>

<!-- 点称号显示弹窗 -->
<div class="popup" @click="fade">
  <div class="window" @click.stop="null">文字文字文字文字文字</div>
</div>

</template>

<script setup>
import { toRefs,defineProps } from "vue";
import user from "../../modules/userState";
const props = defineProps({
  logo: {},img:{}
});
const {logo,img} = toRefs(props);
console.log(logo.value);
console.log(props.logo);
console.log(props.img);
console.log(img.value);

let pop = ()=>{
  let popup = document.querySelector(".popup");
  popup.style.display = "flex";
}
let fade = () => {
  let popup = document.querySelector(".popup");
  popup.style.display = "none";  
}

</script>

<style scoped>
.infoBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 18%; 
  width: 95%;
}

.userInfo {
  display: flex;
  flex-direction: row;
  border: 2px solid black;
}
.infoImg {
  height: 50px;
  width: 50px;
  border-right: 2px solid black;
}

img {
  height: 100%;
}

.infoText {
  height: 50px;
  width: 120px;
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
  align-items: center;
}

.infoText p {
  margin: 0px;
  padding: 0px;
}


.groupLogo {
  width: 20%;
}

.groupLogo img {
  width: 100%;
}

.popup {
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 150vh;
  background-color: rgba(0, 0, 0, 0.448);
  z-index: 10;
}

.window{
  width: 70vw;
  height: 50vh;
  background-color: white;
  border: 4px solid black;
  padding: 10px;
  font-size: 20px;
}

</style>

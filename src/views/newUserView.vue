<template>
<div class="newUserViewWarp">
  <div class="newUserView fade-in">
    <router-view></router-view>  
    <footerAD></footerAD>  
  </div>  

  <div class="sloaderwarp">
    <div class="loader">Loading…</div>  
  </div>  
</div>

</template>

<script setup>
import footerAD from "../components/footerAD.vue"


// // 在使用图片页面的前一个页面预加载图片
// let guide01 = new Image();
// guide01.src = require(`@/assets/iamge/guide01.png`);
// let guide02 = new Image();
// guide02.src = require(`@/assets/iamge/guide02.png`);
// let guide03 = new Image();
// guide03.src = require(`@/assets/iamge/guide03.png`);
// let guide04 = new Image();
// guide04.src = require(`@/assets/iamge/guide04.png`);
// let guide05 = new Image();
// guide05.src = require(`@/assets/iamge/guide05.png`);
// let guide052 = new Image();
// guide052.src = require(`@/assets/iamge/guide052.png`);
// let canvasBorder = new Image();
// canvasBorder.src = require(`@/assets/iamge/canvas_border.png`);

</script>

<style scoped>

.newUserViewWarp {
  display: flex;   
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/iamge/background.jpg");
  background-size: 100vw;
}

.newUserView {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}


.fade-out {
	-webkit-animation: fade-out .4s ease-in both;
  animation: fade-out .4s ease-in both;
}

@-webkit-keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.sloaderwarp {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow:1;
  width: 100%;
  height: 100%;  
}

.loader {
  width: 200px;
  height: 200px;
  font-size: 20px;
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
</style>

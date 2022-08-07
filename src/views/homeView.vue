<template>
<div class="homeView">
  <homePage></homePage>
  <footerAD></footerAD>

</div>

</template>

<script setup>
import homePage from '../components/homeView/homePage.vue'
import footerAD from "../components/footerAD.vue"


console.log("已经加载了homeView");


</script>

<style scoped>
.homeView {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url("D:/MyWeb/byproject/bypixel/src/assets/iamge/background.jpg");
  background-size: 100vw;
}
</style>

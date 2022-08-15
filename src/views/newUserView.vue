<template>
<div class="newUserView">
  <router-view></router-view>  
  <footerAD></footerAD>  
</div>

</template>

<script setup>
import footerAD from "../components/footerAD.vue"
console.log("已经加载了newUserView");
</script>

<style scoped>
.newUserView {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-image: url("@/assets/iamge/background.jpg");
  background-size: 100vw;
}
</style>

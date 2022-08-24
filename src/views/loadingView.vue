<template>
  <transition name="a">
    <loading v-if="show"></loading>
  </transition>
</template>

<script setup>
import { ref } from 'vue';
// import { useRouter } from "vue-router";
import loading from '../components/loadingView/loading.vue'
import { gotoWXlogin } from "../modules/wxlogin"
let show = ref(false);

// let router = useRouter();
// let toStart = function () {
//   router.replace("/home");
// }





window.onload = function(){
  show.value = true;
  setTimeout(() => {
    show.value = false;
    // toStart();
  }, 2400);
  setTimeout(() => {
    gotoWXlogin();
  }, 2800);

}






</script>

<style scoped>

.a-enter-from  {
  background-color: white;
  opacity: 0;
  filter: grayscale(1);
  color: rgba(255, 255, 255, 0);
}
.a-enter-active {
  transition: all 2.4s;
}
.a-enter-to   { 
  filter: grayscale(0);  
}   
.a-leave-from {
  opacity: 1;
}

.a-leave-active{
  transition: all .4s;
}
.a-leave-to{
  opacity: 0;
}



</style>

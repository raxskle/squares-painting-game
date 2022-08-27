<template>
  <div ref="loadingview" class="loadingview fade-in">
    <loading></loading>    
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import loading from '../components/loadingView/loading.vue'
import { gotoWXlogin } from "../modules/wxlogin"

let loadingview = ref(null);
onMounted(() => {
  setTimeout(() => {
    loadingview.value.className = "loadingview fade-in fade-out";
  }, 2300);  
})

setTimeout(() => {
  gotoWXlogin();
}, 2800);

</script>

<style scoped>
.loadingview{
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.fade-in {
	-webkit-animation: fade-in 2s ease-in both;
  animation: fade-in 2s ease-in both;
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

.fade-out {
	-webkit-animation: fade-out .5s ease-in-out both;
  animation: fade-out .5s ease-in-out both;
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
</style>

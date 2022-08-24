<template>
<div class="homeView">
  <div class="homewarp fade-in">
    <homePage></homePage>
    <footerAD></footerAD>         
  </div>    

<div class="loaderwarp">
  <div class="loader">Loading…</div>  
</div>

</div>

</template>

<script setup>
import homePage from '../components/homeView/homePage.vue'
import footerAD from "../components/footerAD.vue"

</script>

<style scoped>
.homeView {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/iamge/background.jpg");
  background-size: 100vw;
}

.homewarp {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;  
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

.loaderwarp {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow:1;
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


</style>

<template>
<div class="introBox introBox1" @click="con(clickable)">
  <div class="intrologo"><img :src="img"/></div>
  <div class="introText">{{text}}</div>
</div>
</template>

<script setup>
import { defineProps, toRefs } from "vue"
import { useRouter } from "vue-router";
let router = useRouter();
const props = defineProps({
  img: {}, text: {},clickable:{}
});
const { img, text } = toRefs(props);
let toGame = () => {
  router.push("/game");  
}

let con = function (a){
  if (a) {
    console.log("ok");
    toGame()
  }
}


</script>

<style scoped>
.introText {
  width: 50%;
  font-size: 20px;
}
.introBox {
  width: 75vw;
  height: 24vh;
  border:  4px solid black;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.intrologo {
  width: 30%;
  margin-right: 5vw;
}
.intrologo img {
  width: 100%;
}
</style>
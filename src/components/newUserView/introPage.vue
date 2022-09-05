<template>
<div class="intro">
  <div class="title">军训大对抗</div>
  <introBox1 :img="require('@/assets/iamge/yellowlogo.png')" :text="intromsg[0]" :clickable="false"></introBox1>
  <introBox2 :img="require('@/assets/iamge/greenlogo.png')" :text="intromsg[1]"  :clickable="false"></introBox2>

  <div class="toSelect"  @click="toSelect">我要加入对抗!</div>
</div>
<!-- title 25vh
  box 25vh
  box 25vh
  select 10vh
  AD7vh

  scrollbox  12vh
-->
</template>

<script setup>
import { useRouter } from "vue-router";
import introBox1 from "./introBox1.vue";
import introBox2 from "./introBox2.vue";
let router = useRouter();
let toSelect = () => {
  router.replace("/newUser/select");
}
let intromsg = ["他们忙碌在校园每个角落，只为了让新生获得更好的军训体验。",
  "他们是夏日西瓜爱好者，喜欢吃瓤，也喜欢头顶瓜皮来遮阳。"];

</script>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
}


.title {
  font-size: 14vmin;
  margin-top: 8vh;
  margin-bottom: 4vh;
}


.toSelect {
  position: relative;
  width: 50vmin;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "IPIX";
  font-size: 5vmin;
  margin-top: 2.5vmin;
  background-image: url("@/assets/iamge/confirmborder.png");
  background-size:  100% 100%;
  background-repeat: no-repeat;
  transform-style: preserve-3d;
}

.toSelect::after {
  position: absolute;
  content: "";
  border: 1vmin solid black;
  border-radius: 3px;
  width: 5vmin;
  height: 5vmin;
  bottom: -3vmin;
  right: -3vmin;
  transform: translateZ(-1px);
}

</style>
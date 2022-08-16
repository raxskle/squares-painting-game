<template>
<div class="intro">
<div class="title">军训大对抗</div>
<introBox1 :img="require('@/assets/iamge/yellowlogo.png')" :text="intromsg[0]" :clickable="false"></introBox1>
<introBox2 :img="require('@/assets/iamge/greenlogo.png')" :text="intromsg[1]"  :clickable="false"></introBox2>

<div class="toSelect"  @click="toSelect">我要加入对抗!</div>
</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import introBox1 from "./introBox1.vue";
import introBox2 from "./introBox2.vue";
let router = useRouter();
let toSelect = () => {
  router.replace("/newUser/select");
}
let intromsg = ["他们誓当21世纪后羿，为武汉带来三分凉意。",
  "他们是夏日西瓜爱好者，偷走夏日一抹甜凉是他们一生的追求。"];

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
  font-size: 56px;
  margin-top: 60px;
  margin-bottom: 40px;
}


.toSelect {
  position: relative;
  width: 180px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "IPIX";
  font-size: 20PX;
  margin-top: 10PX;
  background-image: url("@/assets/iamge/confirmborder.png");
  background-size:  100% 100%;
  background-repeat: no-repeat;
  transform-style: preserve-3d;
}

.toSelect::after {
  position: absolute;
  content: "";
  border: 4px solid black;
  border-radius: 3px;
  width: 20px;
  height: 20px;
  bottom: -12px;
  right: -12px;
  transform: translateZ(-1px);
}

</style>
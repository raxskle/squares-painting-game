<template>
<div class="intro">
<div class="title">军训大对抗</div>
<introBox :img="require('@/assets/iamge/yellowlogo.png')" :text="intromsg[0]" :clickable="false"></introBox>
<introBox :img="require('@/assets/iamge/greenlogo.png')" :text="intromsg[1]"  :clickable="false"></introBox>

<button class="toSelect"  @click="toSelect">我要加入对抗</button>
</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import introBox from "./introBox.vue";
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
  background-color: white;
  border: 3px solid black;
  width: 180px;
  height: 50px;
  font-family: "IPIX";
  font-size: 20PX;
  margin-top: 10PX;
}

</style>
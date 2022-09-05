<template>
  <div class="rankingView" @click="fadeRank">
    <div class="rankTitle">
      累计排行榜
    </div>
    <div class="rankingListWarp">
      <rankingList></rankingList>
    </div>

    <div class="returnTips">点击任意地方返回</div>

  </div>

</template>


<script setup>
import rankingList from "./rankingList.vue";
import { defineEmits,   } from "vue";
let emit = defineEmits(['fadeRanking']);
let fadeRank = () => {
  emit("fadeRanking");
}


</script>


<style scoped>

.rankingView {
  background-image: url("@/assets/iamge/background.jpg");
  background-size: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 6;
}
.rankingListWarp{
  width: 100vw;
  height: 70vh;
  overflow: hidden;
}
.rankTitle {
  font-size: 10vmin;
  margin-top: 5%;  
  margin-bottom: 4%;  
}


.returnTips {
  font-size: 4vmin;
  color: rgb(70, 70, 70);
  margin-top: 4vh;
  margin-bottom: 2vh;
  /* margin-bottom: 0.6vmin; */
}


</style>
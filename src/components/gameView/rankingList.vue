<template>
  <div class="rankWarp" @click="fadeRank"> 
    <!-- @click.stop="null" -->
    <div class="ranklist" >
      <rankingItem v-for=" (rankPerson,index) in rankPeople" 
      :key="index" :userNo="index"
      :headimgurl="rankPerson.headimgurl"  :nickname="rankPerson.nickname"
      :group="rankPerson.group"  :user_level="rankPerson.user_level"
      :pixels_num="rankPerson.pixels_num"  
      ></rankingItem>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref  } from "vue";
import rankingItem from "./rankingItem.vue";
// import user from "../../modules/userState";
import axios from "axios";
let emit = defineEmits(['fadeRanking']);
let fadeRank = () => {
  emit("fadeRanking");
}

let rankPeople = ref(null);

axios.get("/user/ranking").then((res) => {
  rankPeople.value = res.data.data.ranking;
}).catch((res) => {
  console.log(res);
})







</script>

<style scoped>
.rankWarp {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 6;
}



.ranklist{
  width: auto;
  height: 100%;
  overflow: scroll;
}
</style>


<template>
<div class="homePage">
  <div class="title">军训大对抗</div>
  <div class="discribe">还没想好文案，大概意思是“真的不参加一下这个游戏吗？”</div>
  <div class="start" @click="toStart">开始游戏</div>
</div>
</template>

<script setup>
import { onMounted,ref} from 'vue';
import { getUrlCode } from "../../modules/wxlogin.js"
import user from "../../modules/userState";
import { useRouter } from "vue-router";
let router = useRouter();

let code = ref("");
code.value = getUrlCode();
onMounted(() => {
  console.log(code.value)
});



let toStart = () => {
  user.getUserData(code.value);
  if (user.group.value == 0) {
    router.replace("/newUser/intro");
  } else if (user.group.value == 1 || user.group .value== 2) {
    router.replace("/game");
  }
}  


</script>

<style scoped>
.homePage {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow:1;
  font-family: 'IPIX';  
}
.start {
  background-color: rgb(255, 255, 255);
  width: 160px;
  height: 50px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  margin: 40px;
  border: 3px solid black;
}


.title {
  font-size: 56px;
  margin-top: 60px;
  margin-bottom: 30px;
}

.discribe {
  width: 75vw;
  height: 50vh;
  border: 4px solid black;
  background-color: white;

}

</style>
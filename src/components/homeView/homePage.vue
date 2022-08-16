<template>
<div class="homePage" @click="toStart" >
  <div class="title">军训大对抗</div>
  <div class="discribe">还没想好文案，大概意思是“真的不参加一下这个游戏吗？”</div>
  <!-- <div class="start" >开始游戏</div> -->
</div>
</template>

<script setup>
import { onMounted,ref} from 'vue';
import { getUrlCode } from "../../modules/wxlogin.js"
import user from "../../modules/userState";
import {toGame} from "../../modules/toGame.js";
import axios from "../../request/axios";
import { useRouter } from "vue-router";
let router = useRouter();

let code = ref("");
code.value = getUrlCode();
onMounted(() => {
  console.log(code.value);
});

// 获取token和判断是否新玩家
let toStart = function () {
  let url = `/user/token?code=${code.value}`;
  let config = {};
  axios
    .get(url, config)
    .then((res) => {
      console.log(res.data);
      user.setWeixinOpenid(res.data.weixin_openid);
      user.setToken(res.data.jwtoken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.jwtoken}`;
      if (res.data.first_login == true) {
        // 进入新手流程
        router.replace("/newUser/intro");
      } else if (res.data.first_login == false) {
        // 获取用户信息，进入主页面
        toGame();
      }
    })
    .catch((res) => {
      console.log("发生错误", res);
    });
};



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
/* .start {
  background-color: rgb(255, 255, 255);
  width: 160px;
  height: 50px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  margin: 40px;
  border: 3px solid black;
  border-radius: 4px;
} */


.title {
  font-size: 56px;
  margin-top: 60px;
  margin-bottom: 40px;
}

.discribe {
  padding: 10px;
  width: 75vw;
  height: 50vh;
  /* border: 4px solid black; */
  /* background-color: white; */
  border-radius: 2px;
  background-image: url("@/assets/iamge/border102.png");
  background-size: 100% 100%;
}

</style>
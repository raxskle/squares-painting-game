<template>
<div class="homePage"   @click="toStart" >
  <div class="title">军训大对抗</div>
  <div class="discribe">
    <p>一年一度的军训又到了。</p>
    <p>激动人心的种太阳时间又到了！</p>
    <p>还在幻想着军训的时候有学姐学长送西瓜？</p>
    <p>这里，只有正义的偷瓜队和射日队。</p>
  </div>
  <!-- <div class="start" >开始游戏</div> -->
</div>


</template>

<script setup>
import { onMounted,ref} from 'vue';
import { getUrlCode } from "../../modules/wxlogin.js";
import user from "../../modules/userState";
import {toGame} from "../../modules/toGame.js";
import axios from "../../request/axios";
import { useRouter } from "vue-router";
let router = useRouter();

let readytogame = ref(false);
let isNewUser;

let code = ref("");
code.value = getUrlCode();
let url = `/user/token?code=${code.value}`;
let config = {};
axios
  .get(url, config)
  .then((res) => {
    console.log(res.data.data);
    user.setWeixinOpenid(res.data.data.weixin_openid);
    user.setToken(res.data.data.jwtoken);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${res.data.data.jwtoken}`;
    console.log("成功存token");
    isNewUser = res.data.data.first_login;
    readytogame.value = true;
    console.log("可以进入游戏")
  })
  .catch((res) => {
    console.log("发生错误", res);
  });

// 获取token和判断是否新玩家
let toStart = function () {
  if (readytogame.value == true) {
    if (isNewUser == true) {
      console.log("新用户");
      router.replace("/newUser/intro");
      // window.location.hash("#/newUser/intro")
      console.log("into /newUser/intro")
    } else if (isNewUser == false) {
      console.log("旧用户");
      toGame();
      console.log("从toGame出来");
    }
    let homeWarp = document.querySelector(".homewarp");
    homeWarp.className = "homewarp fade-in fade-out";
    setTimeout(() => {
      if (homeWarp != null) {
        homeWarp.style.display = "none";           
      }
      if (document.querySelector(".loaderwarp") != null) {
        console.log("加载中")
        document.querySelector(".loaderwarp").style.display = "flex";          
      }      
    }, 300)
    

  }

};

onMounted(() => {
  console.log(code.value);
});

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
  box-sizing: border-box;
  padding: 20px;
  width: 75vw;
  height: 50vh;
  /* border: 4px solid black; */
  /* background-color: white; */
  border-radius: 2px;
  background-image: url("@/assets/iamge/start_border.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.discribe p {
  font-size: 20px;
  padding: 0;
  margin-top: 0px;
  margin-bottom: 6%;

}

</style>
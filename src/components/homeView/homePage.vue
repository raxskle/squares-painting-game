<template>
<div class="homePage"   @click="toStart" >
  <div class="title">军训大对抗</div>
  <div class="discribe">
    <p>一年一度的军训又到了。</p>
    <p>激动人心的种太阳时间又到了！</p>
    <p>还在幻想着军训的时候有学姐学长送西瓜？</p>
    <p>这里，只有邪恶的偷瓜队和射日队。</p>
  </div>
<!-- title 25vh
    discribe  50vh
    AD  7vh
-->
</div>
</template>

<script setup>
import { ref } from 'vue';
import { getUrlCode } from "../../modules/wxlogin.js";
import user from "../../modules/userState";
import {toGame} from "../../modules/toGame.js";
import axios from "../../request/axios";
import { useRouter } from "vue-router";
let router = useRouter();

let readytogame = ref(false);


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
    // console.log("成功存token");
    user.isNewUser = res.data.data.first_login;
    readytogame.value = true;
    // console.log("可以进入游戏");
  })
  .catch((res) => {
    console.log("发生错误", res);
  });

// 获取token和判断是否新玩家
let toStart = function () {
  if (readytogame.value == true) {
    if (user.isNewUser == true) {
      // console.log("新用户");
      router.replace("/newUser/select");
      // window.location.hash("#/newUser/intro")
      console.log("into /newUser")
    } else if (user.isNewUser == false) {
      // console.log("旧用户");
      toGame();
    }
    let homeWarp = document.querySelector(".homewarp");
    homeWarp.className = "homewarp fade-in fade-out";
    setTimeout(() => {
      if (homeWarp != null) {
        homeWarp.style.display = "none";           
      }
      if (document.querySelector(".loaderwarp") != null) {
        // console.log("加载中")
        document.querySelector(".loaderwarp").style.display = "flex";          
      }      
    }, 300)
    

  }

};

let canvasBorder = new Image();
canvasBorder.src = require(`@/assets/iamge/canvas_border.png`);

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


.title {
  font-size: 14vmin;
  margin-top: 8vh;
  margin-bottom: 6vh;
}

.discribe {
  box-sizing: border-box;
  padding: 5vmin;
  width: 75vw;
  height: 50vh;
  border-radius: 2px;
  background-image: url("@/assets/iamge/start_border.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.discribe p {
  font-size: 5vmin;
  padding: 0;
  margin-top: 0px;
  margin-bottom: 4vmin;

}

</style>
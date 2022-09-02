<template>
<div class="introBox introBox1" @click="postGroup(clickable)">
  <div class="intrologo"><img :src="img"/></div>
  <div class="introText">{{text}}</div>
</div>
</template>

<script setup>
import { defineProps, toRefs } from "vue"
// import { useRouter } from "vue-router";
import axios from "../../request/axios";
// import user from "../../modules/userState";
import {toGame} from "../../modules/toGame";

// let router = useRouter();
const props = defineProps({
  img: {}, text: {},clickable:{},group:{}
});
const { img, text, group } = toRefs(props);



// 发送选择的阵营
let postGroup = function (clickable) {
  console.log(group.value);
  if (clickable) {
    let data = { "group": group.value };
    axios.post("/user/group",data).then((res) => {
      console.log(res);
      toGame();      

    }).catch((res) => {
      console.log(res);
    });
    let newUserView = document.querySelector(".newUserView");
    newUserView.className = "newUserView fade-out";
    setTimeout(() => {
      if (newUserView != null) {
        newUserView.style.display = "none";           
      }
      if (document.querySelector(".sloaderwarp") != null) {
        // console.log("加载中")
        document.querySelector(".sloaderwarp").style.display = "flex";          
      }      
    }, 50)

  } else {
    console.log("fail to click");
  }
}


</script>

<style scoped>
.introText {
  width: 50%;
  font-size: 5vmin;
}
.introBox {
  position: relative;
  width: 75vw;
  height: 23vh;
  /* border:  4px solid black; */
  margin-bottom: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* background-color: white; */
  background-image: url("@/assets/iamge/selectborder.png");
  background-size:  100% 100%;
  background-repeat: no-repeat;
}

.introBox::before{
  position: absolute;
  content: "";
  border: 1vmin solid black;
  background-color: white;
  border-radius: 2px;
  width: 3.5vw;
  height: 3.5vw;
  bottom: -2vmin;
  left: -2vmin;
}

.introBox::after{
  position: absolute;
  content: "";
  border: 1vmin solid black;
  background-color: white;
  border-radius: 2px;
  width: 6vmin;
  height: 6vmin;
  bottom: -3.5vmin;
  left: 5vmin;
}

.intrologo {
  width: 30%;
  margin-right: 5vw;
}
.intrologo img {
  width: 100%;
}
</style>
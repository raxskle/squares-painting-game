<template>

  <div class="introBox introBox1" @click="popConfirm(clickable)">
    <div class="intrologo"><img :src="img"/></div>
    <div class="introRight">
      <div class="groupName">种太阳队</div>
      <div class="introText">{{text}}</div>    
    </div>
  </div>  

  <div class="confirmWarp1">
    <div class="confirm1">
      <div class="confirmText">选择队伍不可更改，你将和种太阳队一起征战3天！
  你确定要选择种太阳队吗？</div>
      <div class="groupClick">
        <div class="yesthisGroup"  @click="yesGroup">确认</div>
        <div class="nothisGroup"  @click="noGroup">再想想</div>
      </div>
    </div>
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


let popConfirm = (clickable) => {
  if (clickable == true) {
    document.querySelector(".confirmWarp1").style.display = "flex";    
  }
}

let yesGroup = () => {
  postGroup(true);
}

let noGroup = () => {
  document.querySelector(".confirmWarp1").style.display = "none";   
}


// 发送选择的阵营
let postGroup = function (clickable) {
  console.log("group.value",group.value);
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
.confirmWarp1 {
  display:none;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 4;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.311);  
}
  
.confirm1 {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80vmin;
  height: 25vh;
  background-color: white;
  border: 3px solid black;
  border-radius: 2px;
  z-index: 4;
  top: 34vh;

}

.confirmText {
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;  
  padding: 5vmin;
}

.groupClick{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;  
  width: 100%;
  border-top: 3px solid black;
  height: 40%;
}

.yesthisGroup {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  border-right: 3px solid black;
  height: 100%;
}

.nothisGroup {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  height: 100%;
}
.introRight {
  width: 54%;
  height: 70%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-direction: column;
}

.groupName {
  font-size: 5vmin;
}

.introText {
  width: 100%;
  font-size: 4vmin;
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
  width: 3.5vmin;
  height: 3.5vmin;
  top: -2vmin;
  right: -2vmin;
}

.introBox::after{
  position: absolute;
  content: "";
  border: 1vmin solid black;
  background-color: white;
  border-radius: 2px;
  width: 6vmin;
  height: 6vmin;
  top: -3.5vmin;
  right: 5vmin;
}


.intrologo {
  width: 30%;
  margin-right: 5vw;
}
.intrologo img {
  width: 100%;
}
</style>
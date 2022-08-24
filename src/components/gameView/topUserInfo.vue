<template>
<div class="infoBox">
  <div class="userInfo">

    <div class="infoImg">
      <div class="headFrame">
          <img class="userImg" :src="user.userImg" />  
      </div>
    </div>

    <div class="infoText" @click="pop"><p>{{user.userName.value}}</p></div>

  </div>

  <div class="groupLogo"><img :src="logo" /></div>
</div>

<!-- 点称号显示弹窗 -->
<div class="popup" @click="fade">
  <div class="window" @click.stop="null"></div>
</div>

</template>

<script setup>
import { toRefs,defineProps,watch, onMounted } from "vue";
import user from "../../modules/userState";
import canvas from "../../modules/canvasState";
const props = defineProps({
  logo: {},img:{}
});
const {logo,img} = toRefs(props);
// console.log(logo.value);
// console.log(props.logo);
// console.log(props.img);
console.log(img.value);

let pop = ()=>{
  let popup = document.querySelector(".popup");
  popup.style.display = "flex";
}
let fade = () => {
  let popup = document.querySelector(".popup");
  popup.style.display = "none";  
}


//
// 设置user的队伍等级
if (user.group.value == 1) {
  user.groupLevel.value = canvas.group1Level.value;  
}else if (user.group.value == 2) {
  user.groupLevel.value = canvas.group2Level.value;  
}
console.log("设置user.groupLevel", user.groupLevel.value);
// 根据队伍等级设置头像框

onMounted(() => {
  // if (user.groupLevel.value > 0) {
    if (user.group.value == 1) {
      try {
      document.querySelector(".headFrame").style.backgroundImage = "url(green_frame.png)";        
      } catch (err) {
        console.log(err);
      }

    } else if (user.group.value == 2) {
      try {
      document.querySelector(".headFrame").style.backgroundImage = "url(yellow_frame.png)";        
      } catch (err) {
        console.log(err);
      }   
    }
  // }  
})

// 监视队伍升级
watch(user.groupLevel, (newval) => {
  if (newval > 1) {
    if (user.group.value == 2) {
    document.querySelector(".headFrame").style.backgroundImage = "url(green_frame.png)";
    } else if (user.group.value == 1) {
      document.querySelector(".headFrame").style.backgroundImage = "url(yellow_frame.png)";    
    }  
  }
})

</script>

<style scoped>
.infoBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 18%; 
  width: 90%;
}

.userInfo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

}

.infoImg{

  display: flex;
  justify-content: center;
  align-items: center;
}

.userImg {
  width: 46%;
  border-radius: 50%;
  border: 2px solid black;
}

.headFrame{
  height: 88px;
  width: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: antiquewhite; */
  /* background-image: url("@/assets/iamge/green_frame.png"); */
  /* background-image: url("@/assets/iamge/yellow_frame.png"); */
  background-size: 100%;
  margin-right: 4px;

}


.infoText {
  height: 50px;
  max-width: 150px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 2px solid black;
}

.infoText p {
  margin: 0px;
  padding: 0px;
}


.groupLogo {
  width: 20%;
}

.groupLogo img {
  width: 100%;
}

.popup {
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 150vh;
  background-color: rgba(0, 0, 0, 0.448);
  z-index: 10;
}

.window{
  width: 70vw;
  height: 50vh;
  background-color: white;
  border: 4px solid black;
  padding: 10px;
  font-size: 20px;
  border-radius: 4px;
}

</style>

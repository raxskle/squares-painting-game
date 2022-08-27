<template>
<div class="infoBox">
  <div class="userInfo">
    <div class="infoImg">
      <div ref="headFrame" class="headFrame">
          <img class="userImg" :src="user.userImg" />  
      </div>
    </div>

    <div class="infoText" @click="pop">{{user.userName.value}}</div>
  </div>

  <div class="groupLogo"><img :src="logo" /></div>
</div>


</template>
<script setup>
import { toRefs,defineProps,onMounted,watch, ref } from "vue";
import user from "../../modules/userState";
// import canvas from "../../modules/canvasState";
const props = defineProps({
  logo: {},clickable:{}
});
const {logo,clickable} = toRefs(props);

let pop = () => {
  if (clickable.value == true) {
    document.querySelector(".popupWinerPage").style.display = "flex";    
  }
}


// // 设置user的队伍等级
// console.log("设置user.groupLevel", user.groupLevel.value);
// if (user.group.value == 1) {
//   user.groupLevel.value = canvas.group1Level.value;
// }else if (user.group.value == 2) {
//   user.groupLevel.value = canvas.group2Level.value;
// }


// 根据队伍等级设置头像框
console.log("初始化设置头像框")
let headFrame = ref(null);
onMounted(() => {
  if (user.groupLevel.value >= 2) {
    if (user.group.value == 1) {
      try {
      headFrame.value.style.backgroundImage = "url(green_frame.png)";        
      } catch (err) {
        console.log(err);
      }

    } else if (user.group.value == 2) {
      try {
      headFrame.value.style.backgroundImage = "url(yellow_frame.png)";        
      } catch (err) {
        console.log(err);
      }   
    }
  }  
})


// 监视队伍升级
watch(user.groupLevel, (newval) => {
  if (newval >= 2) {
    if (user.group.value == 1) {
    document.querySelector(".headFrame").style.backgroundImage = "url(green_frame.png)";
    } else if (user.group.value == 2) {
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
  height: 15vh; 
  width: 95%;
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
  height: 12vh;
  width: 12vh;
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
  max-width: 35vw;
  min-width: 16vw;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: rgb(255, 255, 255);
  /* display: flex;
  justify-content: center;
  align-items: center; */
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  border: 2px solid black;
}


.groupLogo {
  height: 10vh;
}

.groupLogo img {
  height: 100%;
}


</style>
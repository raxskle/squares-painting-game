<template>
<div class="infoBox">
  <div class="userInfo">
    <div class="infoImg" @click="pop">
      <div ref="headFrame" class="headFrame">
          <img class="userImg" :src="user.userImg" />  
      </div>
    </div>

    <div class="infoText" @click="pop">
      <div class="redPoint3"></div>
      {{user.userName.value}}
    </div>
  </div>

  <div class="groupLogo"  @click="toGuide">
    <img :src="logo" />
    <div class="guideAgain" v-if="clickable">新手教学</div>
  </div>
</div>
<guideView v-if="showguide" @showguideA="showguideA" :notuserouter="true"></guideView>

</template>
<script setup>
import { toRefs,defineProps, onMounted,watch, ref } from "vue";
import user from "../../modules/userState";
// import router from "@/router";
import guideView from "../../views/guideView.vue"
// import canvas from "../../modules/canvasState";
const props = defineProps({
  logo: {},clickable:{}
});

const { logo, clickable } = toRefs(props);



let pop = () => {
  if (clickable.value == true) {
    const redPoint3 = document.querySelectorAll(".redPoint3");  
    if (redPoint3[0].style.display == "flex") {
    redPoint3[0].style.display = "none";
    redPoint3[1].style.display = "none";
    console.log(user.groupLevel.value);
    localStorage.setItem("groupLevelCard", user.groupLevel.value);    
    }   
    document.querySelector(".popupWinerPage").style.display = "flex";     
  }
}

let showguide = ref(false);
let showguideA = (val) => {
  showguide.value = val;
}
let toGuide = () => {
  if (clickable.value == true) {
    showguideA(true);
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



  // 名称小红点 等级==1，2，4
  let oldCardSign = localStorage.getItem("groupLevelCard");
  if (oldCardSign == null) {
    oldCardSign = 0;
  }
  console.log("oldCardSign", oldCardSign);
  console.log("user.groupLevel.value", user.groupLevel.value);
  const redPoint3 = document.querySelector(".redPoint3");
  if (oldCardSign < user.groupLevel.value) {
    if (user.groupLevel.value == 1 || user.groupLevel.value == 2 || user.groupLevel.value == 4) {
      redPoint3.style.display = "flex";
    } else {
      redPoint3.style.display = "none";
    }
  } else {
    redPoint3.style.display = "none";      
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
  position: relative;
}


.groupLogo {
  height: 10vh;
  width: 10vh;
  position: relative;
}

.groupLogo img {
  height: 100%;
  width: 100%;
}


.redPoint3 {
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  background-color: red;
  display: none;
  position: absolute;
  top: 1vw;
  right: 1vw;
}


.guideAgain {
  position: absolute;
  font-size: 3.2vmin;
  margin: 0;
  padding: 0;
  width: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top:10.1vh;
}

</style>
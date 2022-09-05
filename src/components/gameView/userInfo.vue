<template>
<div class="infoBox">
  <div class="userInfo">
    <div class="infoImg" @click="showRank">
      <div ref="headFrame" class="headFrame">
          <img class="userImg" :src="user.userImg" />
      </div>
    </div>

    <div class="infoMsg">
      <div class="infoText">
        {{user.userName.value}}
      </div>
      <div class="infoLevel">
        <img class="infogroupLevel" :src="userLevelImg" />
        <img class="infomyLevel" :src="userProgressImg" />
      </div>
    </div>
  </div>

  <div class="groupLogo" @click="pop">
    <img :src="logo" />
    <div class="groupLevel">Group Lv.{{user.groupLevel}}</div>
  </div>
</div>

<rankingView v-if="showRanking"  @fadeRanking="fadeRanking"></rankingView>
</template>

<script setup>
import { toRefs,defineProps, onMounted,watch, ref } from "vue";
import user from "../../modules/userState";
import rankingView from "./rankingView.vue";
// import router from "@/router";
// import canvas from "../../modules/canvasState";
const props = defineProps({
  logo: {},clickable:{}
});

const { logo, clickable } = toRefs(props);

let urlprefix = process.env.VUE_APP_develope == "true"? "":"/drill-battle";

let showRanking = ref(false);
let fadeRanking = () => {
  showRanking.value = false;
}

let showRank = () => {
  if (clickable.value == true) {
    showRanking.value = true;
  }
}

let userProgressImg = ref();
userProgressImg.value = `${urlprefix}/bar${user.group.value}${user.level.value}.png`;
// if (user.group.value == 1) {
//   userProgressImg.value = urlprefix+ "/bar1.png";
// } else {
//   userProgressImg.value = urlprefix+ "/bar2.png";
// }

let userLevelImg = ref("");
userLevelImg.value = `${urlprefix}/rankingLv${user.level.value}.png`;

watch(user.level, (newval) => {
  userLevelImg.value = `${urlprefix}/rankingLv${newval}.png`;
  userProgressImg.value = `${urlprefix}/bar${user.group.value}${newval}.png`;
})

let pop = () => {
  if (clickable.value == true) {
    // const redPoint3 = document.querySelectorAll(".redPoint3");  
    // if (redPoint3[0].style.display == "flex") {
    // redPoint3[0].style.display = "none";
    // redPoint3[1].style.display = "none";
    // console.log(user.groupLevel.value);
    // localStorage.setItem("groupLevelCard", user.groupLevel.value);    
    // }   
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
console.log("初始化设置头像框");
let headFrame = ref(null);
onMounted(() => {
  if (user.groupLevel.value >= 3) {
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


  // // 名称小红点 等级==1，2，4        new  2,3,5
  // let oldCardSign = localStorage.getItem("groupLevelCard");
  // if (oldCardSign == null) {
  //   oldCardSign = 0;
  // }
  // console.log("oldCardSign", oldCardSign);
  // console.log("user.groupLevel.value", user.groupLevel.value);
  // const redPoint3 = document.querySelector(".redPoint3");
  // if (oldCardSign < user.groupLevel.value) {
  //   if (user.groupLevel.value == 2 || user.groupLevel.value == 3 || user.groupLevel.value == 5) {
  //     redPoint3.style.display = "flex";
  //   } else {
  //     redPoint3.style.display = "none";
  //   }
  // } else {
  //   redPoint3.style.display = "none";      
  // }
})


// 监视队伍升级
watch(user.groupLevel, (newval) => {
  if (newval >= 3) {
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
  height: 13vh; 
  width: 95%;
  margin-top: 1vh;
}

.userInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

.infoMsg{
  width:32vw;
  height: 8vh;
  /* background-color: antiquewhite; */
  display: flex;
  justify-content: space-around;
  align-items: center;  
  flex-direction: column;
}

.infoText {
  /* padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 10px;
  padding-right: 10px; */
  width: 100%;
  /* background-color: rgb(255, 255, 255); */

  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  /* border: 2px solid black; */
  position: relative;
  height: 3vh;
  line-height: 3vh;
  font-size: 2.6vh;
  /* font-weight: bolder; */
}

.infoLevel{
  width: 100%;
  height: 3vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.infogroupLevel {
  height: 80%;
}

.infomyLevel {
  height: 80%;
  margin-left: 1.5vmin;
}

.groupLogo {
  /* height: 7vh; */
  /* width: 7vh; */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.groupLogo img {
  height: 8vh;
  width: 8vh;
}

.groupLevel {
  font-size: 4vmin;
  font-weight: 600;
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


/* .guideAgain {
  position: absolute;
  font-size: 3.2vmin;
  margin: 0;
  padding: 0;
  width: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top:10.1vh;
} */

</style>
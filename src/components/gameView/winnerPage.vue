<template>
<div class="winPageWarp">
  <div class="winpageWarp-AD" @click="toMain">
    <userInfo :logo="logo"  :clickable="false" ></userInfo>
    <section class="winCardWarp">
      <div class="card0">
        <div ref="cd1" class="cardDefalutText">Group Lv.2即可解锁</div>
        <div ref="card1" class="card1">
          <img class="userimg" :src="user.userImg" />
          <div>青铜哦，再接再厉！</div>
        </div>
        </div>
      <div class="card0">
        <div ref="cd2" class="cardDefalutText">Group Lv.3即可解锁</div>
        <div ref="card2" class="card2">
          <img class="userimg" :src="user.userImg" />
          <div>太棒啦，白银能手！</div>
        </div>
        </div>
      <div class="card0">
        <div ref="cd3" class="cardDefalutText">Group Lv.5即可解锁</div>
        <div ref="card3" class="card3">
          <img class="userimg" :src="user.userImg" />
          <div>OMG！已经是黄金啦！</div>
        </div>
        </div>
    </section>

    <div class="backToMain">
      <!-- <div class="toMainBtn">
        <div class="btnColor" :style="{backgroundColor}"  >填色</div>
      </div> -->
      <div class="returnTips">点击任意地方返回</div>
    </div>
     
  </div>
  <footerAD></footerAD>   
</div>

<!-- 
  top  15vh
  cards 55vh
  btn 13vh
-->

</template>

<script setup>
import userInfo from './userInfo.vue';
import { toRefs,defineProps, ref, onMounted,watch} from "vue";
import user from "../../modules/userState";
// import canvas from "../../modules/canvasState";
import footerAD from '../footerAD.vue';


const props = defineProps({
  logo: {},
});
const { logo } = toRefs(props);

let backgroundColor = ref("");
if (user.group.value == 1) {
  // console.log("设置winpage 涂色框的颜色")
  backgroundColor.value = "#00d599";
} else if (user.group.value == 2) {
  // console.log("设置winpage 涂色框的颜色")
  backgroundColor.value = "#ffc500"
}

let card1 = ref(null);
let card2 = ref(null);
let card3 = ref(null);
let cd1 = ref(null);
let cd2 = ref(null);
let cd3 = ref(null);
// 初始化设置卡片
onMounted(() => {
  // console.log("winner page mounted");
  // 即使display==none的组件也会执行代码
  if (user.groupLevel.value >= 2) {
    cd1.value.style.display = "none";
    card1.value.style.display = "flex";
  }
  if (user.groupLevel.value >= 3) {
    cd2.value.style.display = "none";
    card2.value.style.display = "flex";
  }
  if (user.groupLevel.value >= 5) {
    cd3.value.style.display = "none";
    card3.value.style.display = "flex";
  }
})

watch(user.groupLevel, (newval) => {
  if (newval == 2) {
    cd1.value.style.display = "none";
    card1.value.style.display = "flex";
  }  
  else if (newval == 3 || newval == 4) {
    cd1.value.style.display = "none";
    cd2.value.style.display = "none";
    card1.value.style.display = "flex";    
    card2.value.style.display = "flex";
  }  
  else if (newval == 5 || newval == 6) {
    cd1.value.style.display = "none";
    cd2.value.style.display = "none";    
    cd3.value.style.display = "none";    
    card1.value.style.display = "flex";
    card2.value.style.display = "flex";
    card3.value.style.display = "flex";
  }    
})



let toMain = () => {
  document.querySelector(".popupWinerPage").style.display = "none";
}

</script>

<style scoped>
.winPageWarp {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: rgba(94, 94, 94, 0.186);
}

.winpageWarp-AD{
  width: 100%;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
.winCardWarp {
  width: 100vw;
  height: 58vh;
  /* background-color: antiquewhite; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}

.card0 {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 16vh;
  height: 23vw;
  width: 90vw;
  /* background-color: rgb(88, 184, 184); */
  background-image: url("@/assets/iamge/win_card0.png");
  background-size: 100% 100%;
  /* filter: drop-shadow(0 0 4vw #ffb520aa); */

}

.cardDefalutText{
  width: 90%;
  font-size: 5vmin;
}
.userimg {
  width: 13%;
  height: auto;
  border-radius: 50%;
  border: 2px solid black;
  position: absolute;
  left: 5%;
}

.card1 {
  display: none;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  max-height: 16vh;
  height: 23vw;
  width: 90vw;
  color: rgb(162, 54, 0);
  background-image: url("@/assets/iamge/win_card1.png");
  background-size: 100% 100%;
  position: relative;
}


.card2 {
  display: none;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  max-height: 16vh;
  height: 23vw;
  width: 90vw;
  color: rgb(0, 0, 111);
  background-image: url("@/assets/iamge/win_card2.png");
  background-size: 100% 100%;
  position: relative;
}

.card3 {
  display: none;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  max-height: 16vh;
  height: 23vw;
  width: 90vw;
  color: rgb(103, 12, 0);
  background-image: url("@/assets/iamge/win_card3.png");
  background-size: 100% 100%;
  position: relative;
}


.backToMain {
  width: 100vw;
  height: 13.5vh;
  /* background-color: aquamarine; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.toMainBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12vh;
  height: 12vh;
  background-image: url("@/assets/iamge/controllerb.png");
  background-size: 100% 100%;
}

.btnColor {
  width: 9vh;
  height: 9vh;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3vh;
}


.returnTips{
  font-size: 4vmin;
  color: rgb(67, 67, 67);
}
</style>
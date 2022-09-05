<template>
  <div class="rankItem">
    <div class="rankNo">{{rankNo}}</div>
    <img ref="thisborder" class="rankImg" :src="rankImg"/>
    <div class="rankName">{{rankName}}</div>
    <div class="rankLevel"><img :src="rankLevelimg"/></div>
    <div class="rankNum">{{rankDrawNum}}</div>
    <div class="rankLogo"><img :src="rankLogo"/></div>

  </div>
</template>

<script setup>
import user from "../../modules/userState";
import { ref,defineProps, toRefs, onMounted, } from 'vue';

let props = defineProps({
  userNo: {},
  headimgurl: {},
  nickname: {},
  group: {},
  user_level: {},
  pixels_num: {},
})
let { userNo, headimgurl, nickname,group,user_level ,pixels_num } =toRefs( props);
// console.log("props",props.userNo);

let thisborder = ref(null);
let rankNo = ref("1.");
let rankImg = ref("");
let rankName = ref("名字名字");
let rankGroup = ref(2);
let rankLevel = ref("");
let rankDrawNum = ref("已涂：18");
let rankLogo = ref("");
let rankLevelimg = ref("");

rankNo.value = userNo.value + 1+ ".";

rankImg.value = headimgurl.value;

rankName.value = nickname.value;
if (rankName.value.length > 6) {
  rankName.value = rankName.value.slice(0, 5) + "...";
}

rankGroup.value = group.value;
// console.log(" group.value", group.value);
onMounted(() => {
  // console.log("rankGroup.value", rankGroup.value);
  if (rankGroup.value == 1) {
    thisborder.value.style.border = "4px solid #00d599";
  } else if (rankGroup.value == 2){
    thisborder.value.style.border = "4px solid #ffc500";
  }
  
})


rankLevel.value = user_level.value;
if (rankLevel.value == 1) {
  rankLevelimg.value = "rankingLv1.png";
} else if (rankLevel.value == 2) {
  rankLevelimg.value = "rankingLv2.png";  
} else if (rankLevel.value == 3) {
  rankLevelimg.value = "rankingLv3.png";  
} else if (rankLevel.value == 4) {
  rankLevelimg.value = "rankingLv4.png";  
} else if (rankLevel.value == 5) {
  rankLevelimg.value = "rankingLv5.png";  
} else if (rankLevel.value == 6) {
  rankLevelimg.value = "rankingLv6.png";  
} else {
  rankLevelimg.value = "rankingLvnull.png";  
}

// console.log("pixels_num.value",pixels_num.value)
rankDrawNum.value = "已涂：" + pixels_num.value;


rankLogo.value = user.headimgurl;
if (rankNo.value == 1) {
  rankLogo.value = "rankingNo1.png"
} else if (rankNo.value == 2)  {
  rankLogo.value = "rankingNo2.png"  
} else if (rankNo.value == 3)  {
  rankLogo.value = "rankingNo3.png"  
} else {
  rankLogo.value = "rankingNonull.png"  
}




</script>

<style scoped>
.rankItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 7vh;
  width: 90vw;
  margin-left: 3vmin;
  margin-right: 3vmin;
  border-bottom: 1px solid rgb(109, 109, 109);
  background-color: rgba(255, 255, 255, 0.516);
}
.rankImg {
  height: 68%;
  width: auto;
  border-radius: 50%;
  margin-right: 1vmin;
  border: 4px solid rgb(0, 0, 0);
}

.rankName{
  font-size: 4vmin;
  width: 30%;

}

.rankNum {
  width: 20vmin;
  font-size: 4vmin;
}

.rankNo {
  margin-left: 1vmin;
  width: 6vmin;
  font-size: 4vmin;
}
.rankLevel {
  height: 35%;  
  width: 12%;
  margin-right: 1vmin;
}

.rankLevel img {
  height: 100%;
}
.rankLogo {
  height: 80%;  
}

.rankLogo img {
  height: 100%;
}
</style>


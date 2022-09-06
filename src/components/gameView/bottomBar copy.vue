<template>
<div class="bar" >
  <div class="btnBox">
    <div class="btn btnleft"  @click="popSituation">
      <div class="redPoint2"></div>
      战况</div>
    <div class="btncenter" @click="changeMode">
    <div id="drawBtn" class="btncenterChange" >{{drawBtnText}}</div>
    </div>
    <div class="btn btnright"  @click="popTask">
      <div class="redPoint1"></div>
      规则</div>        
  </div>

</div>

<!-- 任务弹窗 -->
<div class="popupTask" @click="fadeTask">
  <div class="taskWindow">
    <div class="taskX"></div>
    <h2>游戏规则</h2>
    <div class="taskContainer" @click.stop="null">
      <div class="taskTitle" @click="rulespread('.t1')">今日任务</div>
      <div class="taskWarp t1">
        <div class="taskInfo" v-bind:innerHTML="taskText"></div>  
        <div class="tasksubTitle"  @click="rulespread()">目标图案:</div>
        <div class="taskImg">
          <!-- <img  class="taskimage" src="http://192.168.80.149:8081/green_frame.png"/> -->
          <img  class="taskimage" :src="taskImgurl"/>
        </div> 
      </div>

      <div class="taskTitle" @click="rulespread('.t2')">团队通行证升级</div>
      <div class="taskWarp t2">
        <div class="taskInfo">
          &nbsp; &nbsp; 记得关注每日更新的任务哦，根据完成的任务个数可以获得相应积分，积1分解锁青铜通行证，积2分解锁白银通行证，积4分就可以拿到最高级的通行证啦！
        </div>  
      </div>      
      
      <div class="taskTitle" @click="rulespread('.t3')">个人填色升级</div>
      <div class="taskWarp t3">
        <div class="taskInfo">
          &nbsp; &nbsp; 我们为你准备了六个不同的等级颜色，一天内连续涂色3次和一天内累计涂色6次，都可以获得颜色升级哦。
        </div>  
      </div>      

      <div class="taskTitle" @click="rulespread('.t4')">游戏线下福利</div>
      <div class="taskWarp t4">
        <div class="taskInfo">
          <span>
            游戏维持<span class="highLight">3天</span>，凭借最终通行证等级可以兑换相应<span class="highLight">水果捞满减</span>券。
            <br/><br/>排行榜<span class="highLight">前十位</span>可以抽取<span class="highLight">实物周边惊喜盲盒</span>。
            <br/><br/>具体兑换方式将在<span class="highLight">最后一天</span>公布。
          </span>
          </div>  
      </div>      


    </div>
  </div>
</div>

<!-- 战况弹窗 -->
<div  class="popupSituation"  @click="fadeSituation">
  <situation :showSit="showSit" @changeShowSit="changeShowSit"></situation>
</div>

<!-- 填色成功，填色冲突失败，填色冷却中 -->
<div class="popupTips">
  <div class="tipsText">{{tipsText}}</div>
</div>



</template>

<script setup>
import axios from 'axios';
import { toRefs, defineProps, defineEmits,watch,ref, onMounted } from 'vue';
import user from "../../modules/userState";
import canvas from "../../modules/canvasState";
import situation from "./situation.vue";
import cdtime from "../../modules/cdtime";


let props = defineProps({
  mode: {
    type: Number,
  },
  refresh: {
    type: Boolean,
  },  
})
let { mode } = toRefs(props);
// 设置颜色
let drawColor;
if (user.group.value == 1) {
  drawColor = "#00d599";
} else if (user.group.value == 2) {
  drawColor = "#ffc500";  
} 



let showList = ref(false);


// 设置cdtime
let drawBtnText = ref("");
if (user.CDtime.value <= 0) {
  drawBtnText.value = "填色";
} else if (user.CDtime.value > 0) {
    let CDTimeM = ref(Math.floor(user.CDtime.value / 60));
    let CDTimeS = ref(user.CDtime.value % 60);
    if (CDTimeS.value < 10) {
      CDTimeS.value = `0${CDTimeS.value}`;
    }
    drawBtnText.value = `${CDTimeM.value}:${CDTimeS.value}`;  
}

// cdtime实时更新显示
watch(user.CDtime, (newval) => {
  console.log("cd时间更新");
  if (newval == 0 ||newval<0) {
    drawBtnText.value = "填色";
  } else {
    let CDTimeM = ref(Math.floor(user.CDtime.value / 60));
    let CDTimeS = ref(user.CDtime.value % 60);
    if (CDTimeS.value < 10) {
      CDTimeS.value = `0${CDTimeS.value}`;
    }
    drawBtnText.value = `${CDTimeM.value}:${CDTimeS.value}`;
  }
  
})

// 填色成功、失败、冷却提示
let tipsText = ref("");
let popTips = function (text) {
  tipsText.value = text;
  let tips = document.querySelector(".popupTips");
  tips.className="popupTips scale-in-center"
  setTimeout(() => {
    tips.className = "popupTips scale-out-center";
  }, 2000);
}


let emit = defineEmits(['changeMode', "changeRefresh"]);
let changeMode = () => {
  if (mode.value == 1) {
    
    emit("changeMode", 0);
  } else if (mode.value == 0) {
    // 请求是否能填色
    axios.get(`/user/state`).then((res) => {
      console.log(res);
      if (res.data.data.state == true && user.CDtime.value<=0) {
        emit("changeMode", 1);
      } else {
        popTips("每位玩家五分钟内只能填色一次！点击右上方分享按钮，保存二维码并分享可重置冷却时间");
      }
    }).catch((res) => {
      console.log(res);
    })
  } else if (mode.value == 2) {
    // 发送填色：选中的格子
    let config = {
      position: canvas.targetSquare.value,
    };
    let drawurl = `/canvas`;
    if (process.env.VUE_APP_develope == "true") {
      drawurl = `/canvaspost`;
    }
    axios.post(drawurl, config).then((res) => {
      console.log(res);
      // 成功填色就  弹窗成功，回到mode0，请求画布并更新，请求冷却时间
      if (res.data.data.conflicting == false && res.data.data.cooling == false) {
        popTips("填色成功！");
        emit("changeMode", 0);
        emit("changeRefresh", true);
        cdtime.getCDtime();
        // 更新个人等级
        if (res.data.data.is_user_upgraded == true) {
          console.log("user升级了");
          user.level.value = res.data.data.user_level;
        }
        // 更新队伍等级
        if (res.data.data.is_group_upgraded == true) {
          console.log("group升级了");
          if (user.group.value == 1) {
            canvas.group1Level.value = res.data.data.group_level;
          }
          if (user.group.value == 2) {
            canvas.group2Level.value = res.data.data.group_level;
          }          
          user.groupLevel.value = res.data.data.group_level;

          // 显示小红点
          let oldSitSign = localStorage.getItem("groupLevelSit");
          if (oldSitSign == null) {
            oldSitSign = 0;
          }

          let oldCardSign = localStorage.getItem("groupLevelCard");
          if (oldCardSign == null) {
            oldCardSign = 0;
          }

          if ( oldSitSign < user.groupLevel.value) {
            const redPoint2 = document.querySelector(".redPoint2");
            redPoint2.style.display = "flex";  
          }
          // if (oldCardSign < user.groupLevel.value) {
            // const redPoint3 = document.querySelector(".redPoint3");
            // if (user.groupLevel.value == 1 || user.groupLevel.value == 2 || user.groupLevel.value == 4) {
            //   redPoint3.style.display = "flex";
            // }
          // }      

          //查看是否有完成了画布
          axios.get("/group/status").then((res) => {
            console.log(res);
            canvas.group1CompleteTarget.value = res.data.data.groups[0].complete_target;
            canvas.group2CompleteTarget.value = res.data.data.groups[1].complete_target;
          }).catch((res) => {
            console.log(res);
          })


        }        

      } else {
        // 填色失败就  弹窗失败， 回到mode1,请求画布并更新
        if (res.data.data.conflicting == true) {
          popTips("你选择的方格已被你的阵营填色，请重新选择！");
          // console.log("填色失败，你选择的方格已被你的阵营填色");
        } else if (res.data.data.cooling == true) {
          popTips("填色失败，请重试！")
          // console.log("填色失败，同用户一小时内只能填色一次");
        }
        emit("changeMode", 1);       
        emit("changeRefresh",true);          
      }

    }).catch((res) => {
      console.log(res);
    });
  }

}

// 监视mode改变时改填色框的颜色
watch(mode, (newval,oldval) => {
  const drawBtn = document.querySelector("#drawBtn");  
  console.log("mode change ", newval);
  if (newval == 1&&oldval ==0) {
    drawBtn.style.backgroundColor = drawColor;    
    drawBtnText.value = "填色";
  } else if (newval == 0&&oldval==1) {
    drawBtn.style.backgroundColor = "rgb(225, 225, 225)";   
    drawBtnText.value = "填色";
  } else if (newval == 2) {
    drawBtnText.value = "确认";
  } else if (newval == 0&&oldval == 2) {
    drawBtn.style.backgroundColor = "rgb(225, 225, 225)";
    drawBtnText.value = "填色";          
  } else if (newval == 1 && oldval == 2) {
    drawBtnText.value = "填色";      
  }
});

// watch(refresh, (newval) => {
//   // const drawBtn = document.querySelector("#drawBtn");
//   if (newval == true) {
//     // console.log(111)
//     // drawBtn.style.height = "90px";
//     // drawBtn.style.width = "90px";
//     // drawBtn.style.lineHeight = "90px";
//     // drawBtn.style.borderRadius = "45px";
//   } else if (newval == false) {
//     setTimeout(() => {
//       // drawBtn.style.height = "76px";
//       // drawBtn.style.width = "76px";
//       // drawBtn.style.lineHeight = "76px";
//       // drawBtn.style.borderRadius = "38px";
//     }, 500);

//   }
// })

// 任务
const taskText1 = `&nbsp; &nbsp; 涂色数量更多的一队将积一分。`;
const taskText2 = `&nbsp; &nbsp; 涂色数量更多的一队将积一分。<br/>&nbsp; &nbsp; 另外，下面是你队今日的目标图案，在画布上用自己队伍的颜色完成图案涂色也可以积一分，同时，对方队伍也有一个不同的目标图案，谨慎对方动态，注意及时破坏哦！`;
const taskText3 = `&nbsp; &nbsp; 涂色数量更多的一队将积一分。<br/>&nbsp; &nbsp; 另外，下面是你队今日的目标图案，在画布上用自己队伍的颜色完成图案涂色也可以积一分，同时，对方队伍也有一个不同的目标图案，谨慎对方动态，注意及时破坏哦！`;
let taskText = ref(`默认文字`);
let sign;



let popTask = () => {
  let popup = document.querySelector(".popupTask");
  popup.style.display = "flex";
  const redPoint1 = document.querySelector(".redPoint1");  
  if (redPoint1.style.display == "flex") {
    redPoint1.style.display = "none";
    console.log(sign);
    localStorage.setItem("task", sign);
  }
}
let fadeTask = () => {
  let popup = document.querySelector(".popupTask");
  popup.style.display = "none";  
  let t1 =  document.querySelector(".t1");
  let t2 =  document.querySelector(".t2");
  let t3 =  document.querySelector(".t3");
  let t4 = document.querySelector(".t4");
  t1.style.display = "none";
  t2.style.display = "none";
  t3.style.display = "none";
  t4.style.display = "none";
}





let showSit = ref(false);
let changeShowSit = (val) => {
  showSit.value = val;
}
let popSituation = () => {
  changeShowSit(true);
  // situation里控制显示
  const redPoint2 = document.querySelector(".redPoint2");  
  // 设置当前的等级
  if (redPoint2.style.display == "flex") {
    redPoint2.style.display = "none";
    console.log(user.groupLevel.value);
    localStorage.setItem("groupLevelSit", user.groupLevel.value);
  }
  showList.value = true;
}
let fadeSituation = () => {
  let popup = document.querySelector(".popupSituation");
  popup.style.display = "none";  
}

let taskImgurl=ref("");
//小红点
onMounted(() => {
  // 打开主页面时获取任务
  axios.get(`/task`).then((res) => {
    // console.log("获取任务：", res);
    sign = res.data.data.task;
    console.log("sign",sign);
    if (sign == 1) {
      taskText.value = taskText1;
    } else if (sign == 2) {
      taskText.value = taskText2;      
    } else if (sign == 3) {
      taskText.value = taskText3;            
    }

    
    if (res.data.data.img == null) {
      document.querySelector(".taskImg").style.display = "none";
      document.querySelector(".tasksubTitle").style.display = "none";
    } else {
      taskImgurl.value = res.data.data.img;
    }

    let oldMission = localStorage.getItem("task");
    if (oldMission == null) {
      oldMission = 0;
    }  
    console.log("oldMission", oldMission);
    const redPoint1 = document.querySelector(".redPoint1");
    if (oldMission < sign) {
      redPoint1.style.display = "flex";
    } else {
      redPoint1.style.display = "none";
    }
  }).catch((res) => {
    console.log(res);
  })

  // 战况小红点
  let oldSitSign = localStorage.getItem("groupLevelSit");
  if (oldSitSign == null) {
    oldSitSign = 0;
  }
  console.log("oldSitSign", oldSitSign);
  console.log("user.groupLevel.value", user.groupLevel.value);
  const redPoint2 = document.querySelector(".redPoint2");
  if (oldSitSign < user.groupLevel.value) {
    redPoint2.style.display = "flex";  
  } else {
      redPoint2.style.display = "none"; 
    }
})


let rulespread = (target) => {
  let targetDom = document.querySelector(target);
  console.log(targetDom.style.display);
  // let taskWarpList = document.querySelectorAll(".taskWarp");
  // for (let task of taskWarpList) {
  //   task.style.display = "none";
  // }
  let t1 =  document.querySelector(".t1");
  let t2 =  document.querySelector(".t2");
  let t3 =  document.querySelector(".t3");
  let t4 = document.querySelector(".t4");
  t1.style.display = "none";
  t2.style.display = "none";
  t3.style.display = "none";
  t4.style.display = "none";

  if (targetDom.style.display != "none" ) {
    targetDom.style.display = "none";  
  } else if (targetDom.style.display == "none") {
    targetDom.style.display = "flex";  
  }

}
// taskTitle

</script>


<style scoped>
.bar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 13vh;
  /* position: relative; */
}

.btnBox {
  /* position: absolute; */
  /* border: 4px solid black; */
  width: 80vw;
  height: 12vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: url("@/assets/iamge/controllera.png");
  background-size:  100% 100%;
  background-repeat: no-repeat;
  /* filter: grayscale(100%); */
}

.btn{
  /* border: 3px solid black; */
  z-index: 1;
  width: 32vw;
  height: 12vw;
  line-height: 12vw;
  text-align: center;
  font-size: 2.6vh;
  background-color: rgba(255, 255, 255, 0);
  position: relative;
}

.btncenter {
  position: absolute;
  z-index: 2;
  height: 12vh;
  width: 12vh;  
  /* border: 4px solid black; */
  /* border-radius: 49px; */
  /* background-color: rgba(255, 255, 255, 0); */
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/iamge/controllerb.png");
  background-size:  100% 100%;
  background-repeat: no-repeat;
}

.btncenterChange {
  background-color: rgb(225, 225, 225);
  height: 9vh;
  width: 9vh;   
  line-height: 9vh;  
  font-size: 3vh;  
  border-radius: 50%;  
  text-align: center;
  transition: .5s;
}

.btnleft {
  margin-right: 7.5vmin;
}


.btnright {
  margin-left: 7.5vmin;
}


.popupTask {
  display: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 120vh;
  background-color: rgba(0, 0, 0, 0.448);
  z-index: 10;
}

.taskWindow{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  width: 88vw;
  height: 65vh;
  margin-top: 14vh;
  background-color: white;
  border: 4px solid black;
  box-sizing: border-box;
  font-size: 4vmin;
  border-radius: 4px;
  position: relative;
}


.taskX{
  position: absolute;
  width: 7vmin;
  height: 7vmin;
  top: 1vh;
  right: 1vh;
  background-image: url("@/assets/iamge/taskclose.png");
  background-size: 100% 100%;
}
.taskContainer{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;  
  overflow: scroll;
  width: 100%;
  padding-bottom: 2vh;
}
.taskWindow h2 {
  margin: 0;
  margin-top: 1vh;
  margin-bottom: 1vh;
  padding: 0;
}

.taskInfo{
  font-size: 4vmin;
  display: flex;
  justify-content: center;
  align-items: center;
}

.taskWarp {
  padding-top: 0.5vh;  
  padding-bottom: 2vh;
  padding-left: 4.4vh;  
  padding-right: 4.4vh;  
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


.taskTitle{
  margin-top: 3vh;
  padding-top: 0.2vh;
  padding-bottom: 0.2vh;
  margin-bottom: 2vh;
  font-size: 5.5vmin;  
  font-weight: 560;
  width: 82%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgb(174, 174, 174);
  border-top: 1px solid rgb(174, 174, 174);
}

.title4 {
  margin-bottom: 6vh;
}
.tasksubTitle {
  margin-top: 2vh;
  margin-bottom: 1vh;
  font-size: 5vmin;  
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;  
}
.taskImg {
  width: 104%;
  margin-top: 0;
  margin-bottom: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.taskimage {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.popupSituation {
  display: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 0; 
  /* 让它从网页的top 0 开始 */
  width: 100vw;
  height: 120vh;
  z-index: 10;
  background-image: url("@/assets/iamge/background.jpg");
  background-size: 100vw;
  background-repeat: repeat-y;
}



.popupTips{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  width: 55vw;
  height: auto;
  min-height: 8vh;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-left: 2vmin;
  padding-right: 2vmin;
  border: 3px solid black;
  /* border-radius: 2px; */
  background-color: rgb(255, 255, 255);
  top: 60vh;
  transition: all .5s;
  opacity: 0;
  padding: 5px;
  z-index: -1;
}

/* .popanime {
  z-index: 10;
  visibility: visible;  
  opacity: 1;
  transition: all .5s;
} */

.scale-in-center {
  z-index: 10;
  visibility: visible;  
  opacity: 1;
	-webkit-animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}
@keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}

.scale-out-center {
  z-index: -1;
  visibility: hidden;  
	-webkit-animation: scale-out-center 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  animation: scale-out-center 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@-webkit-keyframes scale-out-center {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
  60% {
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
}
@keyframes scale-out-center {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
  60% {
    opacity: 0;    
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
}

.tipsText {
  display: flex;
  justify-content: center;
  align-items: center;
}

.redPoint1 {
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  background-color: red;
  display: none;
  position: absolute;
  top: 5vw;
  right: 6vw;
}

.redPoint2 {
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  background-color: red;
  display: none;
  position: absolute;
  top: 5vw;
  right: 6vw;
}


.highLight {
  color: rgb(241, 137, 109);
  font-weight: 600;
}
</style>
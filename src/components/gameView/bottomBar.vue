<template>
<div class="bar" >
  <div class="btnBox">
    <div class="btn btnleft"  @click="popAbout">
      <div class="redPoint2"></div>
      {{controllLeftText}}</div>
    <div class="btncenter" @click="changeMode">
    <div id="drawBtn" class="btncenterChange" >{{drawBtnText}}</div>
    </div>
    <div class="btn btnright"  @click="popReward">
      <div class="redPoint1"></div>
      {{controllRightText}}</div>
  </div>

</div>

<!-- 任务弹窗 -->
<div class="popupTask" @click="fadeTask">
  <div class="taskWindow">
    <div class="taskX"></div>
    <h2>游戏规则</h2>
    <div class="taskContainer" @click.stop="null">
      <div class="taskWarptop">
        <span>
          欢迎来到军训大对抗！
          <br/>
          <br/>
          作为军训期间限定小游戏，本游戏将持续3天(9.7-9.9)。
          <br/>
          <br/>
          种太阳队vs吃西瓜队，队伍每日有至多两次的升级机会。级数更高的一队将取得游戏的最终胜利！
        </span>
      </div>
      <div class="taskTitle" @click="rulespread('.t1')">团队今日任务</div>
      <div class="taskWarp t1">
        <div class="taskInfo" >
        <div v-if="taskshow1" class="task11"><span>当天<span class="highLight">涂色数量</span>更多的一队将升一级。</span></div>
        <div v-if="taskshow2" class="task12"><span>当天<span class="highLight">涂色数量</span>更多的队伍将升一级。<br/><br/>当天完成过一次<span class="highLight">目标图案</span>涂色的队伍将升一级。</span></div>
        <div v-if="taskshow3" class="task13"><span>当天<span class="highLight">涂色数量</span>更多的队伍将升一级。<br/><br/>当天完成过一次<span class="highLight">目标图案</span>涂色的队伍将升一级。</span></div>
        </div>  
        <div class="tasksubTitle"  @click="rulespread()">目标图案:</div>
        <div class="taskImg">
          <!-- <img  class="taskimage" src="http://192.168.80.149:8081/green_frame.png"/> -->
          <img  class="taskimage" :src="taskImgurl"/>
        </div> 
      </div>

      <div class="taskTitle" @click="rulespread('.t2')">队伍升级机制</div>
      <div class="taskWarp t2">
        <div class="taskInfo">
          <span>
            队伍升级解锁相应<span class="highLight">通行证</span>，点击涂色页面右上方图标可查看。
            <br/>
            <br/>
            团队升至Lv.3时可以解锁<span class="highLight">特制头像框</span>。            
          </span>

        </div>  
      </div>      
      
      <div class="taskTitle" @click="rulespread('.t3')">个人升级机制</div>
      <div class="taskWarp t3">
        <div class="taskInfo">
          <span>
            当日<span class="highLight">涂色6块</span>升一级，当日<span class="highLight">涂色15块</span>可再升一级。
            <br/>
            <br/>
            升级后<span class="highLight">填色颜料</span>会相应升级，点击头像可查看<span class="highLight">排行榜</span>。            
          </span>

        </div>  
      </div>      

      <div class="taskTitle" @click="rulespread('.t4')">游戏线下奖励</div>
      <div class="taskWarp t4">
        <div class="taskInfo">
          <span>
            游戏维持<span class="highLight">3天</span>，凭借最终通行证等级可以兑换相应<span class="highLight">水果捞满减</span>券。
            <br/><br/>排行榜<span class="highLight">前30位</span>可以抽取<span class="highLight">实物周边惊喜盲盒</span>。
            <br/><br/>具体兑换方式将在<span class="highLight">最后一天（9月9日）</span>公布。
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

<div v-if="showAbout" class="abcWarp"  @click="fadeAbout">
  <div  class="popUpabc" >
    <div class="popUpabcIn" @click.stop="null">
      <h2 class="highLight">团队及成员</h2>
      <span>
        <span>团队：</span>
        <br/>
        本游戏由<a href="https://mp.weixin.qq.com/s/8gd4jEPklJM0Ki2S3-FmdQ">冰岩作坊</a>团队制作
        <br/>
      </span>
      

      <span>
        <br/>   
        <span>项目组成员：</span>
        <br/>
        项目总负责：TuTu      <br/>
        游戏策划：TuTu/Devotion/小西霉      <br/>
        前端：可乐      <br/>
        后端：小尹      <br/>
        设计：玛卡煋      <br/>
      </span>

      <h2 class="highLight">我们想说：</h2>
      <span>
        首先，感谢你参加我们的小游戏。
        <br/>
        <br/>
        其次，我们想说声抱歉。因为我们的考虑不周，游戏有许多不足之处，比如两队人数差距悬殊。
        <br/>
        <br/>
        从创意产生，到开发、运营，项目组每一个人都在尽力改进。若有不足，还望包涵。
        <br/>
        <br/>
        欢迎加入我们！期待和你再次相见！
        <br/> 
        <br/> 
      </span>

    </div>



  </div>
</div>


<div v-if="showReward" class="abcWarp"  @click="fadeReward">
  <div  class="popUpabc">
    <div  class="popUpabcIn">
      <div @click.stop="null">
        <h2 class="highLight">水果捞满减</h2>
        <span>
          种太阳队Group lv.4，获满<span class="jiacu">20元-6元</span>福利。
          <br/>
          吃西瓜队Group lv.2，获满<span class="jiacu">20元-4元</span>福利。
          <br/>
          <br/>
          <span class="jiacu">可用时间：</span>
          <br/>
          2022年9月10日——2022年9月17日。
          <br/>
          <br/>
          <span class="jiacu">可用门店：</span>
          <br/>
          夏记水果捞（绝望坡必胜客对面），蜜果C水果捞（生活区门附近）。<span  class="jiacu">（可通过导航查询）</span>
          <br/>
          <!-- <div class="laoimg"><img class="lao" src="@/assets/iamge/lao1.jpg"/></div>
          <div class="laoimg"><img class="lao" src="@/assets/iamge/lao2.jpg"/></div>
          <div class="laoimg"><img class="lao" src="@/assets/iamge/lao3.jpg"/></div> -->
          
          <br/>
          <span class="rewardColor">付款前请主动将此券出示给营业员。</span>
          <br/>
          <div class="rewardCard"><img class="rewardCardimg" :src="rewardCardurl" /></div>
        </span>
        <br/>
        <h2 class="highLight">神秘华科周边</h2>
        <span>
          请上榜的30名同学扫码加负责人微信，进行领奖。（截至2022/9/11）
        </span>
        <div class="jiavx">
          <img class="jiavximg" src="@/assets/iamge/jiavx.jpg"/>          
        </div>

      </div>      
    </div>

  </div>
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

let controllLeftText = ref("战况");
let controllRightText = ref("规则");

// let showList = ref(false);


// 设置cdtime
let drawBtnText = ref("填色");
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
  if (mode.value == 3) {
    drawBtnText.value = "填色";
  }
  
})

// 填色成功、失败、冷却提示
let tipsText = ref("");
let popTips = function (text, cd) {
  let time = 2000;
  if(cd == 1){
    time = 5000;
  }
  tipsText.value = text;
  let tips = document.querySelector(".popupTips");
  tips.className="popupTips scale-in-center"
  setTimeout(() => {
    tips.className = "popupTips scale-out-center";
  }, time);
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
        popTips("点击画布右上角的转发按钮，分享游戏即可获得一次冷却时间清零。",1);
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
          let oldSitSign = localStorage.getItem("groupLevelSit1");
          if (oldSitSign == null) {
            oldSitSign = 0;
          }

          let oldCardSign = localStorage.getItem("groupLevelCard1");
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
  } else if (mode.value == 3) {
    console.log("游戏已结束");
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
// const taskText1 = `<span>当天<span class="highLight">涂色数量</span>更多的一队将升一级。</span>`;
// const taskText2 = `<span>当天<span class="highLight">涂色数量</span>更多的队伍将升一级。<br/><br/>当天完成过一次<span class="highLight">目标图案</span>涂色的队伍将升一级。</span>`;
// const taskText3 = `<span>当天<span class="highLight">涂色数量</span>更多的队伍将升一级。<br/><br/>当天完成过一次<span class="highLight">目标图案</span>涂色的队伍将升一级。</span>`;
// let taskText = ref(`默认文字`);
let sign;



// let popTask = () => {
//   let popup = document.querySelector(".popupTask");
//   popup.style.display = "flex";
//   const redPoint1 = document.querySelector(".redPoint1");  
//   if (redPoint1.style.display == "flex") {
//     redPoint1.style.display = "none";
//     console.log(sign);
//     localStorage.setItem("task1", sign);
//   }
// }
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
// let popSituation = () => {
//   // 战况页面与主页面同步一下
//   changeShowSit(true);
//   // situation里控制显示
//   const redPoint2 = document.querySelector(".redPoint2");  
//   // 设置当前的等级
//   if (redPoint2.style.display == "flex") {
//     redPoint2.style.display = "none";
//     console.log(user.groupLevel.value);
//     localStorage.setItem("groupLevelSit1", user.groupLevel.value);
//   }
//   showList.value = true;
// }
let fadeSituation = () => {
  let popup = document.querySelector(".popupSituation");
  popup.style.display = "none";  
}

let taskImgurl=ref("");

let taskshow1 = ref(false);
let taskshow2 = ref(false);
let taskshow3 = ref(false);

//小红点
onMounted(() => {
  // 打开主页面时获取任务
  axios.get(`/task`).then((res) => {
    // console.log("获取任务：", res);
    sign = res.data.data.task;
    console.log("sign",sign);
    if (sign == 1) {
      // taskText.value = taskText1;
      taskshow1.value = true;
    } else if (sign == 2) {
      // taskText.value = taskText2;  
      taskshow2.value = true;    
    } else if (sign == 3) {
      // taskText.value = taskText3;  
      taskshow3.value = true;          
    }

    
    if (res.data.data.img == null) {
      document.querySelector(".taskImg").style.display = "none";
      document.querySelector(".tasksubTitle").style.display = "none";
    } else {
      taskImgurl.value = res.data.data.img;
    }

    let oldMission = localStorage.getItem("task1");
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
  let oldSitSign = localStorage.getItem("groupLevelSit1");
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


// 游戏结束显示为涂色冻结
if (mode.value == 3) {
  drawBtnText.value = "填色";
  controllLeftText.value = "关于我们";
  controllRightText.value = "领奖方式";
}

let showAbout = ref(false);
let showReward = ref(false);

let popAbout = () => {
  showAbout.value = true;
}

let fadeAbout = () => {
  showAbout.value = false;
}

let popReward = () => {
  showReward.value = true;

}

let fadeReward = () => {
  showReward.value = false;  
}


let rewardCardurl = ref("");
if (user.group.value == 1) {
  rewardCardurl.value = "reward1.png";
} else if (user.group.value == 2) {
  rewardCardurl.value = "reward2.png";  
}

watch(showReward, (newval) => {
  if (newval == true) {
    setTimeout(() => {
      if (user.group.value == 1) {
        document.querySelector(".rewardColor").style.color = "#00d599";
      } else if (user.group.value == 2) {
        document.querySelector(".rewardColor").style.color = "#ffc500";
      }    
    }, 10);    
  }


})


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
  padding-left: 4.8vh;  
  padding-right: 4.8vh;  
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.taskWarptop {
  padding-top: 0.5vh;  
  padding-bottom: 2vh;
  padding-left: 4.7vh;  
  padding-right: 4.7vh;  
  display: flex;
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
  /* width: 58vw; */
  width: auto;
  min-width: 40vw;
  max-width: 58vw;
  height: auto;
  min-height: 5vh;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 5vmin;
  padding-right: 5vmin;
  border: 3px solid black;
  border-radius: 3px;
  background-color: rgb(255, 255, 255);
  top: 60vh;
  transition: all .5s;
  opacity: 0;
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


.abcWarp {
  width: 100vw;
  height: 100vh;
  z-index: 100;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;  
}
.popUpabc {
  width: 90vw;
  height: 78vh;
  position: relative;
  /* top: 30vh; */
  background-color: white;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding-top: 2vh;

}

.popUpabc h2 {
  margin: 0;
  margin-top: 2vh;
  margin-bottom: 1vh;
  padding: 0;
  font-size: 5.5vmin;
}



/* .popUpabc span {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 4vmin;
}
 */
.popUpabc a {
  text-decoration: none;
}


.popUpabc::after {
  content: "✖ ";
  position: absolute;
  top: 0;
  right: 2vmin;
}

.popUpabcIn {
  width: 90%;
  padding: 5%;
  height: 90%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.laoimg {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1vh;
  margin-bottom: 1vh;
}
.lao {
  width:55%;
}

.rewardCard {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rewardCardimg {
  width: 85%;
}

.jiavx {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.jiavximg {
  width: 70%;
}

.jiacu {
  font-weight: 600;
}


.rewardColor {
  color: #ffc500;
}
</style>
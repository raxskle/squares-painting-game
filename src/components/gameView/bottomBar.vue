<template>
<div class="bar">
  <!-- <div class="btnBox"> -->
    <div class="btn btnleft">战况</div>
    <div class="btncenter" @click="changeMode">
    <div id="drawBtn" class="btncenterChange" >{{drawBtnText}}</div>
    </div>
    <div class="btn btnright">任务</div>    
  <!-- </div> -->

</div>

</template>

<script setup>
import axios from 'axios';
import { toRefs, defineProps, defineEmits,watch,ref } from 'vue';
import user from "../../modules/userState";
import canvas from "../../modules/canvasState";
let props = defineProps({
  mode: {
    type: Number,
  },
  drawed: {
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

let drawBtnText = ref("涂色");

let emit = defineEmits(['changeMode', "changeDrawState"]);
let changeMode = () => {
  if (mode.value == 1) {
    
    emit("changeMode", 0);  
  } else if (mode.value == 0) {
    // 请求是否能涂色
    axios.get(`/user/state`).then((res) => {
      console.log(res);
      if (res.data.state == true) {
        emit("changeMode", 1);          
      } else {
        // popupCD
      }
    }).catch((res) => {
      console.log(res);
    })
  } else if (mode.value == 2) {
    // 发送涂色：选中的格子
    let config = {
      data: {
        position: canvas.targetSquare.value,
      }
    };
    axios.post(`/canvaspost`, config).then((res) => {
      console.log(res);
      // 成功涂色就  弹窗成功，回到mode0，请求画布并更新
      if (res.data.conflicting == false && res.data.cooling == false) {
        console.log("涂色成功！");
        emit("changeMode", 0); 
        emit("changeDrawState",true);

      } else {
        // 涂色失败就  弹窗失败， 回到mode1,请求画布并更新
        if (res.data.conflicting == true) {
          console.log("涂色失败，你选择的方格已被同阵营涂色");
        } else if (res.data.cooling == true) {
          console.log("涂色失败，同用户一小时内只能涂色一次");
        }
        emit("changeMode", 1);       
        emit("changeDrawState",true);          
      }

    }).catch((res) => {
      console.log(res);
    });
  }

}

// 监视mode改变时改涂色框的颜色
watch(mode, (newval) => {
  const drawBtn = document.querySelector("#drawBtn");  
  console.log("mode change ", newval);
  if (newval == 1) {
    drawBtn.style.backgroundColor = drawColor;    
    // drawBtn.style.height = "90px";    
    // drawBtn.style.width = "90px";    
    // drawBtn.style.lineHeight = "90px";    
    // drawBtn.style.borderRadius = "45px";    
    drawBtnText.value = "涂色";
  } else if (newval == 0) {
    drawBtn.style.backgroundColor = "rgb(225, 225, 225)";   
    // drawBtn.style.height = "76px";    
    // drawBtn.style.width = "76px";    
    // drawBtn.style.lineHeight = "76px"; 
    // drawBtn.style.borderRadius = "38px";      
    drawBtnText.value = "涂色";
  } else if (newval == 2) {
    drawBtnText.value = "确认";
  }
});


</script>

<style scoped>
.bar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  /* background-color: blanchedalmond; */
}

/* .btnBox {
  border: 4px solid black;
  width: 200px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
} */

.btn{
  border: 3px solid black;
  z-index: 1;
  width: 32vw;
  height: 12vw;
  line-height: 12vw;
  text-align: center;
  font-size: 24px;
  background-color: white;
}

.btncenter {
  position: absolute;
  z-index: 2;
  height: 90px;
  width: 90px;  
  border: 4px solid black;
  border-radius: 49px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btncenterChange {
  background-color: rgb(225, 225, 225);
  height: 76px;
  width: 76px;   
  line-height: 76px;  
  font-size: 30px;  
  border-radius: 38px;  
  text-align: center;
  transition: .5s;
}

.btnleft {
  margin-right: 30px;
}


.btnright {
  margin-left: 30px;
}

</style>
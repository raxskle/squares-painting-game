<template>
<div class="bar">
  <!-- <div class="btnBox"> -->
    <div class="btn btnleft">战况</div>
    <div class="btncenter" @click="changeMode">
    <div id="drawBtn" class="btncenterChange" >涂色</div>
    </div>
    <div class="btn btnright">任务</div>    
  <!-- </div> -->

</div>

</template>

<script setup>
import { toRefs, defineProps, defineEmits,watch } from 'vue';
import user from "../../modules/userState";
let props = defineProps({
  mode: {
    type: Number,

  },
})
let { mode } = toRefs(props);
// 设置颜色
let drawColor;
if (user.group.value == 1) {
  drawColor = "rgb(0, 213, 153)";
} else if (user.group.value == 2) {
  drawColor = "rgb(255, 197, 0)";  
} 


let emit = defineEmits(['changeMode'])
let changeMode = () => {
  if (mode.value == 1) {
    emit("changeMode", 0);  
  }else if(mode.value == 0) {
    emit("changeMode", 1);    
  }

}

// 监视mode改变时改涂色框的颜色
watch(mode, (oldval, newval) => {
  if (newval == 1) {
    document.querySelector("#drawBtn").style.backgroundColor = "rgb(184, 184, 184)";    
  } else if (newval == 0) {
    document.querySelector("#drawBtn").style.backgroundColor = drawColor;     
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
  background-color: rgb(184, 184, 184);
  height: 80px;
  width: 80px;   
  font-size: 30px;  
  border-radius: 40px;  
  line-height: 80px;
  text-align: center;
}

.btnleft {
  margin-right: 30px;
}


.btnright {
  margin-left: 30px;
}

</style>
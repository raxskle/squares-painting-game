<template>
<div class="select">
  <div class="title">军训大对抗</div>
  <introBox1 :img="require('@/assets/iamge/yellowlogo.png')" :text="intromsg[0]" :clickable="true" :group=2></introBox1>
  <introBox2 :img="require('@/assets/iamge/greenlogo.png')" :text="intromsg[1]"  :clickable="true" :group=1></introBox2>
    <!-- <marquee  align="center" behavior="scroll" 
    bgcolor="green" direction="left" height="50" width="200"  
    loop="-1" scrollamount="4"  >
		HUST勇士，请点击选择一个阵营吧！
    </marquee> -->
  <div class="scrollBox">
    <div class="gridBorder"></div>
    <div class="scrollBar">
      <p class="animate">HUST勇士，请点击选择一个阵营吧！</p>
    </div>
    <div class="gridBorder"></div>    
  </div>

</div>
</template>

<script setup>
import introBox1 from "./introBox1.vue";
import introBox2 from "./introBox2.vue";

let intromsg = ["他们誓当21世纪后羿，为武汉带来三分凉意。",
  "他们是夏日西瓜爱好者，偷走夏日一抹甜凉是他们一生的追求。"];

</script>

<style scoped>
.select {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
}

.title {
  font-size: 14vmin;
  margin-top: 8vh;
  margin-bottom: 4vh;
}



.gridBorder {
  height: 10px;
  width: 100vw;
  background-image: url("@/assets/iamge/gridborder.png");
  background-size: 100% 100% ;
}

.scrollBox {
  margin-top: 3vmin;  
}

.scrollBar {
  width: 100vw;
  height: 6.5vh;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

.animate {
    /* padding-left: 20px; */
    font-size: 4.5vmin;
    line-height: 6.5vh;
    color: #000;
    margin: 0;
    display: inline-block;
    white-space: nowrap;
    animation: 8s wordsLoop linear infinite normal;
}

@keyframes wordsLoop {
    0% {
        transform: translateX(140%);
        -webkit-transform: translateX(140%);
    }
    100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
}

@-webkit-keyframes wordsLoop {
    0% {
        transform: translateX(100%);
        -webkit-transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
}






</style>
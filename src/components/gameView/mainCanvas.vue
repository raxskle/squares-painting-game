<template>
  <div ref="cc" id="canvasContainer">
    <v-stage ref="stage" :config = "configKonva" >
      <v-layer ref="layer" :config="configLayer">

        <v-group ref="Field" :config="configField">
          <v-rect v-for="(square, index) in configSquares " :key="index" :config="square" @touchend="colorEvent" />          
        </v-group>

        <!-- <v-image :config="configImage"></v-image> -->
        <!-- <v-rect :config="a"></v-rect> -->

      </v-layer>
    </v-stage>
  </div>

</template>


<script setup>
import { toRefs, ref, reactive, defineProps, defineEmits,onMounted,watch  } from "vue";
import canvas from "../../modules/canvasState";
import axios from "../../request/axios";
// import 直接执行

const props = defineProps({
  mode: {
    type: Number,
    default: 0
  },
});
const { mode } = toRefs(props);   //得到的props是响应式的
console.log("mode.value:",mode.value);


// 画布缩放
let configLayer = reactive({
  scaleX:1,
  scaleY:1,
})

// 初始化数据
canvas.initCanvasData();

let configKonva = canvas.configKonva;
canvas.fillConfigKonva();

let configField = canvas.configField;
canvas.fillconfigField();

let configSquares = canvas.configSquares;
canvas.fillConfigSquares();


// cc是canvasContainer
let cc = ref(null);
let stage = ref(null);
// Field是画布
let Field = ref(null);
onMounted(() => {
  // console.log("canvasContainer", cc.value);  
  // let FieldContext = Field.value.getNode().children[26];用children拿就会乱序
  // console.log(FieldContext);  
  // 用name拿不会乱序
  stage.value.getStage()
    .find(`.square${canvas.latestPosition.value[0] * canvas.squareXnum + canvas.latestPosition.value[1]}`)[0]
    .moveToTop();
  // 首次显示最新格子：进入主页面之前请求，fill时设置stroke，mounted时movetoTop
  console.log(canvas.configSquares);
})





// 更新画布
let drawCanvas=()=>{
  // 更新画布时的draw操作
  // 将[i][j]转换为i*rownum+j

  // 更新整个画布颜色
  for (let i = 0; i < canvas.squareYnum; i++) {
    for (let j = 0; j < canvas.squareXnum; j++) {
      canvas.configSquares[i * canvas.squareXnum + j].fill = canvas.squareColor(
        i,
        j
      );
    }
  }
  // 更新最新格子
    canvas.configSquares[
      canvas.lastPosition.value[0] * canvas.squareXnum +
        canvas.lastPosition.value[1]
    ].stroke = "rgb(200, 200, 200)";  
    canvas.configSquares[
      canvas.latestPosition.value[0] * canvas.squareXnum +
        canvas.latestPosition.value[1]
    ].stroke = "black";

  // 最新格子movetoTop
  stage.value.getStage()
  .find(`.square${canvas.latestPosition.value[0] * canvas.squareXnum + canvas.latestPosition.value[1]}`)[0]
  .moveToTop();
};
let updateCanvas=()=>{
  // 更新画布
  axios
    .get(`/canvas`)
    .then((res) => {
      canvas.canvasState.value = res.data.canvas;
      canvas.lastPosition.value = canvas.latestPosition.value;
      canvas.latestPosition.value = res.data.last_paint.pixel_position;
      console.log(canvas.canvasState.value); 

      drawCanvas();
    })
    .catch((res) => {
      console.log(res);
    });
};

// 每隔20s获取并刷新一次canvs数据
setInterval(updateCanvas, 20000);
// setInterval里的函数不要用this




// 改变模式
let emit = defineEmits(['changeMode']);
let changeMode = () => {
  if (mode.value == 1) {
    emit("changeMode", 0);
  }
};


watch(mode, (newval) => { 
  if (newval == 1) {
    canvas.squareBorder.value = 2;

    // let FieldContext = Field.value.getNode().children[26];
    // FieldContext.moveToTop();
    // console.log(FieldContext);  
    // stage.value.getStage().find(".square26")[0].moveToTop();
  
  } else if (newval == 0) {
    canvas.squareBorder.value = 0;  
  }
});


// 涂色事件  其实是在点击的位置post group
// mode ,   user.group ,  canvas.postDrawed
let colorEvent = function (event) {
  if (mode.value == 1) {
    let succeed = false;    
    // 在这里成功涂色    
    console.log(event.target.index);
    let i = Math.floor(event.target.index / canvas.squareXnum);
    let j = event.target.index % canvas.squareXnum;
    console.log(i, j);

    if (event.target.attrs.fill != "rgb(0, 213, 153)") {
      event.target.attrs.fill = "rgb(0, 213, 153)";   
      succeed = !succeed;   
    }

    if (succeed) {
      changeMode();  
    } 
  } else if (mode.value == 0) {
    console.log("modevalue is 0 fail to draw");
  }
}

canvas.postDrawed();  // 成功请求




// !!!!!!如果config对象某个属性的值没变，那么这个值相关就不会重新渲染
// 就是缩放前后设置的x和y没变的话，即使实际拖拽x和y改变了，也不会重新渲染x和y

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#canvasContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid black; 
  background-color: #ffffff;
}



</style>

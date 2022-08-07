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
import { toRefs, ref, reactive, defineProps, defineEmits,onMounted } from "vue";
import canvas from "../../modules/canvasState";
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


let cc = ref(null);
onMounted(() => {
  console.log("canvasContainer",cc.value);  
})



// fieldscale0是战况模式，fieldScale1是取消了的放大模式
// const fieldScale0 = stageWidth * 0.95 / fieldWidth;
// const fieldScale1 = 2*fieldScale0;



let Field = ref(null);
// let FieldContext = Field.value.getNode();



// 改变模式
let emit = defineEmits(['changeMode']);
let changeMode = () => {
  if (mode.value == 1) {
    emit("changeMode", 0);
  }
};


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
  background-color: white;
}



</style>

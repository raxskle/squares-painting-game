<template>
  <div id="canvasContainer">
    <v-stage ref="stage" :config = "configKonva" >
      <v-layer ref="layer" :config="configLayer">

        <v-group ref="Field" :config="configField" @touchend="changeMode" >
          <v-rect v-for="(square, index) in configSquare" :key="index" :config="square" @touchend="colorEvent" />          
        </v-group>

        <!-- <v-image :config="configImage"></v-image> -->
        <!-- <v-rect :config="a"></v-rect> -->

      </v-layer>
    </v-stage>
  </div>

</template>


<script setup>
import { onBeforeMount, toRefs, ref, reactive, defineProps, defineEmits, watch } from "vue";
import "../../canvasStatus";
// import 直接执行

const props = defineProps({
  mode: {
    type: Number,
    default: 0
  },
});
const { mode } = toRefs(props);   //得到的props是响应式的
console.log(mode.value);
const emits = defineEmits(['changeMode']);

// 渲染图片
// let image = ref(null);
// let configImage = ref({
//   image: image,
//   x: 200,
//   y: 200,
//   draggable: true,
// });
onBeforeMount(() => {
  // let imaget = new window.Image();
  // imaget.src = "http://10.21.205.168:8081/logo.png";
  // imaget.onload = () => {
  //   console.log(imaget);
  //   image.value = imaget;
  // };
})

// 舞台大小
const stageWidth = window.innerWidth * 0.9;
const stageHeight = window.innerHeight * 0.8;
let configKonva= {
  width: stageWidth,
  height: stageHeight,
  backgroundColor:"black",
};

// 画布缩放
let configLayer = reactive({
  scaleX:1,
  scaleY:1,
})





// 绘制格子 squareXnum*squareYnum
let squareBorder = ref(2);
const fieldWidth = 350;
let squareXnum = 12;
let squareYnum = 12;
let fieldHeight = fieldWidth / squareXnum * squareYnum;
console.log(fieldHeight);
let configSquare = [];
for (let i = 0; i < squareXnum; i++){
  for (let j = 0; j < squareYnum; j++){
    configSquare.push(reactive({
      x: i*fieldWidth/squareXnum,
      y: j*fieldWidth/squareXnum,
      width: fieldWidth/squareXnum,
      height: fieldWidth/squareXnum,
      fill: "white",
      stroke: "rgb(200, 200, 200)",
      strokeWidth: squareBorder,
    }))
  }
}

// // 缩放field mode1
// // 嵌套ref，不用写value直接传，能够嵌套响应式

// fieldscale0是战况模式，fieldScale1是取消了的放大模式
const fieldScale0 = stageWidth * 0.95 / fieldWidth;
// const fieldScale1 = 2*fieldScale0;

const fieldY0 = (stageHeight - fieldHeight *fieldScale0) / 2;
const fieldX0 = (stageWidth - fieldWidth *fieldScale0) / 2;
console.log("fieldScale0:" , fieldScale0);
console.log("fieldX0:", fieldX0);
console.log("fieldY0:", fieldY0);
// 获取Field
let Field = ref(null);
// let FieldContext = Field.value.getNode();

// 配置Field
let configField =reactive({
  draggable: false,
  x: fieldX0,
  y: fieldY0,
  scaleX:fieldScale0,
  scaleY: fieldScale0,
  offsetX: 0,
  offsetY: 0,
  dragBoundFunc: function () {
    return {
      x: fieldX0,
      y: fieldY0
    };
  },
  //   dragBoundFunc: function (pos) {
  //   let newY = pos.y;
  //   if (pos.y > 20) {
  //     newY = 20;
  //   } else if (pos.y < stageHeight- fieldHeight*fieldScale1 -20) {
  //     newY = stageHeight- fieldHeight*fieldScale1 -20;
  //   } else {
  //     newY = pos.y;
  //   }
  //   let newX = pos.x;
  //   if (pos.x > 20) {
  //     newX = 20;
  //   } else if (pos.x <  stageWidth- fieldWidth*fieldScale1 -20) {
  //     newX =  stageWidth- fieldWidth*fieldScale1 -20 ;
  //   } else {
  //     newX = pos.x;
  //   }    
  //   return {
  //     x: newX,
  //     y: newY
  //   };
  // },
}) 


let colorEvent = ref(mode == 1 ? changeColor : null);

let changeMode = function () {
  emits("changeMode", 0);
};

let changeColor = function(event){
  console.log("event.target:",event.target);
  event.target.attrs.fill = "green";
  console.log(event.target.attrs.fill);  
  // changeMode(0);
}

// setTimeout(() => {
//   x.value = 200;
//   console.log(configField.x);  
//   scale.value = 2;  // 链式ref、reactive 只要修改最开头的数据

//   console.log(layerScaleX.value);
//   console.log(configLayer.scaleX);

// },1000)
// 监听mode变化 修改configField

watch(mode, (newValue,oldValue) => {
  console.log("mode变化 " + "from " + oldValue + "to " + newValue);
  if (newValue == 1) {
    // 取消了的缩放相关
    // configField.scaleX = fieldScale1;
    // configField.scaleY = fieldScale1;
    // configField.x = -fieldHeight/2;
    // configField.y = -fieldWidth/2;    
    configField.draggable = true;
    changeColor = (event) => {
      event.target.attrs.fill = "green";
      // console.log(event.target.parent);
      console.log("event.target.attrs.fill:", event.target.attrs.fill);
      colorEvent.value = null;
      changeMode(0);
    };
    colorEvent.value = mode.value == 1 ? changeColor : null;
    squareBorder.value = 2;

  }
  if (newValue == 0) {
    // configField.scaleX = fieldScale0;
    // configField.scaleY = fieldScale0;
    // configField.draggable = false;    
    // console.log(configField);
    colorEvent.value = mode.value == 1 ? changeColor : null;
    squareBorder.value = 1;

  }

})



// let a = reactive({
//   x: 100,
//   y: 100,
//   fill: "white",
//   stroke: "rgb(200, 200, 200)",
//   strokeWidth: 2,
//   width: 100,
//   height: 100,

// }) 
// let b = 0;
// setInterval(() => {
//   a.x = b;
//   b += 10;
//   console.log(b);
// }, 1000);



// !!!!!!如果config对象某个属性的值没变，那么这个值相关就不会重新渲染
// 就是缩放前后设置的x和y没变的话，即使实际拖拽x和y改变了，也不会重新渲染x和y


// //
// console.log(canvasStatus);



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#canvasContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black; 
  margin-top: 10px;
}



</style>

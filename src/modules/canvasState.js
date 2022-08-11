import { ref, reactive } from "vue";
import axios from "../request/axios";
// 主要是维护canvasStatus二维数组
// 在这里： 请求画布状态，发送画布状态，重绘画布
// 初始化页面时 请求画布状态，重绘画布
// 每隔二十秒 请求画布状态，重绘画布
// 用户涂色时 发送画布状态，

let canvas = {
  // 画布状态数组
  canvasState: ref([
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
  ]),
  canvasStateDayn: new Array(12).fill(new Array(12).fill(1)),
  latestPosition: ref([0, 0]),
  lastPosition: ref([0, 0]),
  orangeNum: ref(0),
  greenNum: ref(0),

  // 选中的格子
  targetSquare: ref([0, 0]),

  // 图形数据
  stageHeight: 0,
  stageWidth: 0,

  fieldWidth: 350, // 原稿宽度
  fieldHeight: 0, // 原稿高度
  fieldScale0: 0,
  fieldX0: 0,
  fieldY0: 0,

  squareXnum: 12,
  squareYnum: 12,
  squareBorder: ref(0),

  setStageWH() {
    this.stageWidth = window.innerWidth * 0.9;
    this.stageHeight = window.innerHeight * 0.6;
    // this.stageHeight = window.innerWidth * 0.9;
    // this.stageHeight = document.querySelector(".canvasContainer").;
    console.log("stageWidth:", this.stageWidth);
    console.log("stageHeight:", this.stageHeight);
  },
  setFieldHeight() {
    this.fieldHeight = (this.fieldWidth / this.squareXnum) * this.squareYnum;
    console.log("fieldHeight", this.fieldHeight);
  },
  setFieldScale0() {
    this.fieldScale0 = (this.stageWidth * 0.95) / this.fieldWidth;
    if (this.fieldHeight * this.fieldScale0 > this.stageHeight * 0.95) {
      this.fieldScale0 = (this.stageHeight * 0.95) / this.fieldHeight;
    }
    console.log("fieldScale0", this.fieldScale0);
  },
  setFieldXY() {
    this.fieldY0 = (this.stageHeight - this.fieldHeight * this.fieldScale0) / 2;
    this.fieldX0 = (this.stageWidth - this.fieldWidth * this.fieldScale0) / 2;
    console.log("this.fieldX0", this.fieldX0);
    console.log("this.fieldY0", this.fieldY0);
  },

  // (fieldY0 + fieldHeight*fieldScale0)/2 = stageheight /2
  // fieldY*2 + fieldWidth * scale = stageWidth
  // fieldX*2 +

  // fill函数所使用的数据需要先调用set函数设置
  // init()调用全部set函数
  initCanvasData() {
    this.setStageWH();
    this.setFieldHeight();
    this.setFieldScale0();
    this.setFieldXY();
    console.log("stage:", this.stageHeight);
  },

  configKonva: reactive({}),
  fillConfigKonva() {
    this.configKonva.width = this.stageWidth;
    this.configKonva.height = this.stageHeight;
  },

  configField: reactive({
    draggable: true,
  }),
  fillconfigField() {
    this.configField.x = this.fieldX0;
    this.configField.y = this.fieldY0;
    this.configField.scaleX = this.fieldScale0;
    this.configField.scaleY = this.fieldScale0;
    let newX = this.fieldX0;
    let newY = this.fieldY0;
    this.configField.dragBoundFunc = function () {
      return {
        x: newX,
        y: newY,
      };
    };
  },

  configSquares: [],
  getCanvas() {
    // 初始化获取canvas，进入主页面之前获取
    axios
      .get(`/canvas`)
      .then((res) => {
        this.canvasState.value = res.data.canvas;
        this.latestPosition.value = res.data.last_paint.pixel_position;
        console.log(this.canvasState.value);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  // squareColor0(i, j) {
  //   if (this.canvasState.value[i][j] == 0) {
  //     return "white";
  //   } else if (this.canvasState.value[i][j] == 1) {
  //     return "rgb(0, 213, 153)";
  //   } else if (this.canvasState.value[i][j] == 2) {
  //     return "rgb(255, 197, 0)";
  //   }
  // },
  squareColor(i, j) {
    return this.canvasState.value[i][j];
  },
  setOccupy(i, j) {
    if (this.canvasState.value[i][j] == "#00d599") {
      return 1;
    } else if (this.canvasState.value[i][j] == "#ffc500") {
      return 2;
    } else if (this.canvasState.value[i][j] == "#ffffff") {
      return 0;
    }
  },
  fillConfigSquares() {
    // 初始化config对象
    for (let i = 0; i < this.squareYnum; i++) {
      for (let j = 0; j < this.squareXnum; j++) {
        this.configSquares.push(
          reactive({
            x: (j * this.fieldWidth) / this.squareXnum,
            y: (i * this.fieldWidth) / this.squareXnum,
            width: this.fieldWidth / this.squareXnum,
            height: this.fieldWidth / this.squareXnum,
            fill: this.squareColor(i, j),
            stroke: "rgb(200, 200, 200)",
            strokeWidth: 0,
            name: `square${i * this.squareXnum + j}`,
            occupy: this.setOccupy(i, j),
          })
        );
      }
    }
    // 第一次显示最新涂色块   //整个数组不会变换顺序所以不会乱序
    this.configSquares[
      this.latestPosition.value[0] * this.squareXnum +
        this.latestPosition.value[1]
    ].stroke = "black";
  },

  // 发送涂色位置
  postDrawed() {
    // axios({
    //   url: "/userqwer",
    //   method: "GET",
    // }).then((res) => {
    //   console.log(res);
    // });
    let config = {
      headers: {
        Authorization: "Bearer 123456",
      },
    };
    axios
      .get("/userqwer", config)
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  },
};

export default canvas;

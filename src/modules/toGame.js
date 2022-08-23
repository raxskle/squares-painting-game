import Router from "@/router";

import axios from "../request/axios";
import user from "./userState";
import canvas from "./canvasState";
import cdtime from "./cdtime";

export function toGame() {
  console.log("into toGame");
  // 获取用户数据
  axios
    .get(`/user/info`)
    .then((res) => {
      console.log(res);
      user.userName.value = res.data.data.nickname;
      user.userImg = res.data.data.headimgurl;
      user.group.value = res.data.data.group;
      // user.groupLevel.value = res.data.data.group_level;
      user.level.value = res.data.data.user_level;
      user.pixelsNum.value = res.data.data.user_pixels_num;
    })
    .then(() => {
      // 初始化获取画布数据
      console.log("toGame获取画布");
      canvas.getCanvas();
    })
    .then(() => {
      // 获取队伍等级
      canvas.getGroupState();
    })
    .then(() => {
      // 获取是否冷却时间内
      cdtime.getCDtime();
    })
    .then(() => {
      //进入主界面
      Router.push("/game");
    })
    .catch((res) => {
      console.log(res);
    });
}

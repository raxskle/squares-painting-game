import Router from "@/router";

import axios from "../request/axios";
import user from "./userState";
import canvas from "./canvasState";

export function toGame() {
  // 获取用户数据
  axios
    .get(`/user/info`)
    .then((res) => {
      console.log(res.data);
      user.userName.value = res.data.nickname;
      user.userImg = res.data.headimgurl;
      user.group.value = res.data.group;
      user.groupLevel = res.data.group_level;
      user.level.value = res.data.user_level;
      user.pixelsNum.value = res.data.user_pixels_num;

      // 初始化获取画布数据
      canvas.getCanvas();

      //进入主界面
      Router.push("/game");
    })
    .catch((res) => {
      console.log(res);
    });
}

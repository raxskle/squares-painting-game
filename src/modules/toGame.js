import Router from "@/router";

import axios from "../request/axios";
import user from "./userState";
import canvas from "./canvasState";
// import cdtime from "./cdtime";

export function toGame() {
  console.log("into toGame");
  // 获取用户数据
  axios
    .get(`/home_info`)
    .then((res) => {
      console.log(res);
      user.userName.value = res.data.data.user_info.nickname;
      user.userImg = res.data.data.user_info.headimgurl;
      user.group.value = res.data.data.user_info.group;
      // user.groupLevel.value = res.data.data.group_level;
      user.level.value = res.data.data.user_info.user_level;
      user.pixelsNum.value = res.data.data.user_info.user_pixels_num;

      // console.log("toGame进行到获取画布");
      canvas.canvasState.value = res.data.data.canvas_info.canvas;
      if (res.data.data.canvas_info.last_paint == null) {
        canvas.latestPosition.value = [-1, -1];
      } else {
        canvas.latestPosition.value =
          res.data.data.canvas_info.last_paint.pixel_position;
      }

      canvas.group1Num.value = res.data.data.groups_info[1].total_pixels_num;
      canvas.group2Num.value = res.data.data.groups_info[0].total_pixels_num;
      canvas.squareYnum = res.data.data.canvas_info.canvas.length;
      canvas.squareXnum = res.data.data.canvas_info.canvas[0].length;
      console.log("canvas.squareYnum:", canvas.squareYnum);
      console.log("canvas.squareXnum:", canvas.squareXnum);

      // console.log("toGame进行到获取队伍等级");
      canvas.group1Level.value = res.data.data.groups_info[1].level;
      canvas.group2Level.value = res.data.data.groups_info[0].level;
      console.log("group1Level:", canvas.group1Level.value);
      console.log("group2Level:", canvas.group2Level.value);
      // 设置user group level
      if (user.group.value == 1) {
        user.groupLevel.value = res.data.data.groups_info[1].level;
      } else if (user.group.value == 2) {
        user.groupLevel.value = res.data.data.groups_info[0].level;
      }
      console.log("user.groupLevel", user.groupLevel);

      // 设置是否完成拼图
      canvas.group1CompleteTarget.value =
        res.data.data.groups_info[1].complete_target;
      canvas.group2CompleteTarget.value =
        res.data.data.groups_info[0].complete_target;

      // console.log("toGame进行到获取冷却时间");
      if (res.data.data.user_info.state == true) {
        // console.log("能draw");
        user.CDtime.value = 0;
      } else if (res.data.data.user_info.state == false) {
        // console.log("不能draw");
        let lastTime = res.data.data.user_info.last_paint_time;
        if (lastTime == 0) {
          user.CDtime.value = 0;
        } else {
          // 时间戳单位转换为秒
          if (lastTime > 1600000000000) {
            // 向上取整
            lastTime = Math.ceil(lastTime / 1000);
          }
          // 设置冷却时长
          let duration = 300;
          let nextTime = lastTime + duration;
          let nowTime = Math.floor(Date.now() / 1000);
          console.log("下一次", nextTime);
          // console.log("现在", nowTime);
          // cdt会偏大一丢丢
          let cdt = nextTime - nowTime < 0 ? 0 : nextTime - nowTime;
          if (cdt >= duration) {
            cdt = duration - 1;
          }
          user.CDtime.value = cdt;
          user.timeGoes();
        }
      }
      // 获取上一次涂色的人
      if (res.data.data.canvas_info.last_paint != null) {
        canvas.lastPaintTime.value = res.data.data.canvas_info.last_paint.time;
        canvas.lastPaintName.value =
          res.data.data.canvas_info.last_paint.nickname;
      } else {
        canvas.lastPaintTime.value = 0;
      }

      console.log("进入主页面之前获取数据完成");
    })
    .then(() => {
      // 进入主页面
      if (user.isNewUser == true) {
        Router.replace("/guide");
      } else {
        Router.replace("/game");
      }
    })
    .catch((res) => {
      console.log(res);
    });
}

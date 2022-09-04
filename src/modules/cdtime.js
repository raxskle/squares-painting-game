import axios from "../request/axios";
import user from "./userState";

export default {
  getCDtime() {
    // 获取并设置时间
    // 触发timeGoes函数
    axios
      .get(`/user/state`)
      .then((res) => {
        if (res.data.data.state == true) {
          console.log("能draw");
          user.CDtime.value = 0;
        } else if (res.data.data.state == false) {
          console.log("不能draw");
          let lastTime = res.data.data.last_paint_time;
          // 时间戳单位转换为秒
          if (lastTime > 1600000000000) {
            // 向上取整
            lastTime = Math.ceil(lastTime / 1000);
          }
          let duration = 300;
          let nextTime = lastTime + duration;
          let nowTime = Math.floor(Date.now() / 1000);
          console.log("下一次", nextTime);
          // console.log("现在", nowTime);
          let cdt = nextTime - nowTime < 0 ? 0 : nextTime - nowTime;
          if (cdt >= duration) {
            cdt = duration - 1;
          } else if (cdt < duration - 2) {
            cdt = duration - 1;
          }
          user.CDtime.value = cdt;
          user.timeGoes();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

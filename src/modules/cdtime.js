import axios from "../request/axios";
import user from "./userState";

export default {
  getCDtime() {
    // 获取并设置时间
    // 触发timeGoes函数
    axios
      .get(`/user/state`)
      .then((res) => {
        if (res.data.state == true) {
          user.CDtime.value = 0;
        } else if (res.data.state == false) {
          let lastTime = res.data.last_paint_time;
          // 时间戳单位转换为秒
          if (lastTime > 1600000000000) {
            lastTime = Math.ceil(lastTime / 1000);
          }
          let nextTime = lastTime + 3600;
          let nowTime = Math.floor(Date.now() / 1000);
          console.log("下一次", nextTime);
          console.log("现在", nowTime);
          user.CDtime.value = nextTime - nowTime;
          user.timeGoes();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

import { ref } from "vue";
// import axios from "../request/axios";
let user = {
  weixinOpenid: ref("OPENIDundefined"),
  token: ref("tokenundefined"),
  expire: "undefined",
  isNewUser: false,
  userName: ref("Alex"),
  userImg: "userimg",
  CDtime: ref(0),
  group: ref(0),
  groupLevel: ref(0),
  level: ref(0),
  pixelsNum: ref(0),
  setWeixinOpenid(val) {
    this.weixinOpenid.value = val;
  },
  setToken(val) {
    this.token.value = val;
  },
  updateExpire(val) {
    this.expire = val;
  },
  timeGoes() {
    let cdtimer = setInterval(() => {
      if (user.CDtime.value > 0) {
        user.CDtime.value -= 1;
        // console.log("cdtime left:", user.CDtime.value);
      }
      if (user.CDtime.value <= 0) {
        clearInterval(cdtimer);
        user.CDtime.value = 0;
        // console.log("冷却时间结束");
      }
    }, 1000);
  },
};
export default user;

import { ref } from "vue";
// import axios from "../request/axios";
let user = {
  weixinOpenid: ref("OPENIDundefined"),
  token: ref("tokenundefined"),
  expire: "undefined",

  userName: ref("Alex"),
  userImg: "userimg",
  CDtime: ref(0),
  group: ref(0),
  groupLevel: ref(1),
  level: ref(1),
  pixelsNum: ref(0),
  setWeixinOpenid(val) {
    this.weixinOpenid = val;
  },
  setToken(val) {
    this.token = val;
  },
  updateExpire(val) {
    this.expire = val;
  },
  timeGoes() {
    let cdtimer = setInterval(() => {
      if (user.CDtime.value > 0) {
        user.CDtime.value -= 1;
        console.log("cdtime left:", user.CDtime.value);
      }
      if (user.CDtime.value <= 0) {
        clearInterval(cdtimer);
        user.CDtime.value = 0;
        console.log("冷却时间结束");
      }
    }, 1000);
  },
  // getUserData() {
  //   axios
  //     .get(`/user/info`)
  //     .then((res) => {
  //       console.log(res.data.group);
  //       console.log(this.CDtime);
  //       this.userName = res.data.nickname;
  //       this.userImg = res.data.headimgurl;
  //       this.group.value = res.data.group;
  //       console.log(this.group.value);
  //       this.groupLevel = res.data.group_level;
  //       this.level = res.data.user_level;
  //       this.pixelsNum = res.data.user_pixels_num;
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //     });
  // },
};
export default user;

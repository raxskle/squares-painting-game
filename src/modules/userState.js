import { ref } from "vue";
// import axios from "../request/axios";
let user = {
  weixinOpenid: ref("OPENIDundefined"),
  token: ref("tokenundefined"),
  expire: "undefined",

  userName: ref("Alex"),
  userImg: "userimg",
  CDtime: 3600,
  group: ref(0),
  groupLevel: ref(0),
  level: ref(0),
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

import { ref } from "vue";
import axios from "../request/axios";

let user = {
  id: ref("undefined"),
  token: ref("undefined"),
  expire: "undefined",
  username: ref("Alex"),
  userimg: "userimg",
  CDtime: 7200,
  group: ref(0),
  level: ref(0),
  setId(val) {
    this.id = val;
  },
  updateToken(val) {
    this.token = val;
  },
  updateExpire(val) {
    this.expire = val;
  },
  setUsername(val) {
    this.username = val;
  },
  setUserimg(val) {
    this.userimg = val;
  },
  setGroup(val) {
    this.group = val;
  },
  getUserData(code) {
    let url = `/user/token?code=${code}`;
    console.log("url:", url);
    let config = {};
    axios
      .get(url, config)
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  },
};
export default user;

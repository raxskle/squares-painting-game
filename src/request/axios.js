import axios from "axios";
if (process.env.VUE_APP_develope == "true") {
  // 开发环境
  // axios.defaults.baseURL = "http://192.168.0.105:8081/api";
  axios.defaults.baseURL = "https://api.hust.online/drillbattle";
} else {
  // 测试生产
  axios.defaults.baseURL = "https://api.hust.online/drillbattle";
}

// axios.defaults.baseURL = "http://127.0.0.1";
axios.defaults.timeout = 4000;

export default axios;

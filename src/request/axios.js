import axios from "axios";
axios.defaults.baseURL = "http://192.168.0.105:8081";
// axios.defaults.baseURL = "http://127.0.0.1";
axios.defaults.timeout = 3000;

export default axios;

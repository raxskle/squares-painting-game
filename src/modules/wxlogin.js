let getUrlCode = function () {
  // 在home页获取url 的code
  let url = location.search;
  let theRequest = {};
  if (url.indexOf("?") != -1) {
    let str = url.slice(1);
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
    }
  }
  let code = theRequest.code;
  // console.log("code: ", code);
  // 如果没有code就回到loading页
  if (code === "" || code == null) {
    if (process.env.VUE_APP_develope == "true") {
      window.location.href = "http://192.168.0.105:8081/home";
    } else {
      window.location.href = "h5.hust.online/drill-battle";
    }
  }
  return code;
};

let gotoWXlogin = function () {
  let go = "h5.hust.online/drill-battle/home"; // window.location.href
  let appid = "wxdb6d54fc376bf014";
  if (process.env.VUE_APP_develope == "true") {
    // 开发环境
    go = "http://192.168.0.105:8081/home"; // window.location.href
    appid = "wx45e82dec06f16ca9";
  } else {
    // 测试生产
    go = "h5.hust.online/drill-battle/home"; // window.location.href
    appid = "wxdb6d54fc376bf014";
  }

  let redirect_uri = encodeURIComponent(go);
  let wxhref =
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
    appid +
    "&redirect_uri=" +
    redirect_uri +
    "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";

  //跳转授权页
  window.location.href = wxhref;
};

export { getUrlCode, gotoWXlogin };

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
    window.location.href = "http://192.168.0.105:8081/";
  }
  return code;
};

let gotoWXlogin = function () {
  let goto = "http://192.168.0.105:8081/home"; // window.location.href
  let appid = "wx45e82dec06f16ca9";
  let redirect_uri = encodeURIComponent(goto);
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

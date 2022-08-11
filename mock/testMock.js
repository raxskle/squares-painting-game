const Mock = require("mockjs");
let userToken = Mock.mock({
  first_login: false,
  weixin_openid: "OPENID123",
  jwtoken: "TOKEN123",
});

// let userGroup = Mock.mock({
//   group: 1,
// });

let userInfo = Mock.mock({
  weixin_openid: "openid123456",
  nickname: "NAME1234",
  headimgurl:
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F7Po3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F8cb1cb134954092382ad62ad9c58d109b2de4918.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662645701&t=7b27a3273a4ad6bc0e47da1ad3686a14",
  group: 1,
  group_level: 0,
  user_level: 0,
  user_pixels_num: 0,
});

let groupStatus = Mock.mock({
  groups: [
    {
      id: 1,
      name: "偷瓜队",
      level: 0,
      total_members_num: 0,
      total_pixels_num: 0,
    },
    {
      id: 2,
      name: "射日队",
      level: 0,
      total_members_num: 0,
      total_pixels_num: 0,
    },
  ],
});
let task = Mock.mock({
  task: "这是任务这是任务",
});

let canvas = Mock.mock({
  canvas: [
    [
      "#ffffff",
      "#ffffff",
      "#00d599",
      "#00d599",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#00d599",
      "#00d599",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#00d599",
      "#ffc500",
      "#ffc500",
      "#00d599",
      "#ffffff",
      "#00d599",
      "#ffc500",
      "#ffc500",
      "#00d599",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#00d599",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#00d599",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#00d599",
      "#ffffff",
    ],
    [
      "#00d599",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#ffffff",
      "#ffc500",
      "#00d599",
      "#ffffff",
    ],
    [
      "#00d599",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#ffffff",
      "#ffc500",
      "#ffc500",
      "#00d599",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#00d599",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#ffffff",
      "#ffc500",
      "#00d599",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#00d599",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#ffffff",
      "#ffc500",
      "#00d599",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#00d599",
      "#ffc500",
      "#ffc500",
      "#ffc500",
      "#00d599",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#00d599",
      "#ffc500",
      "#00d599",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#00d599",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
  ],
  last_paint: {
    pixel_position: [2, 3],
    time: 0,
    nickname: "NAME",
    headimgurl: "D:/MyWeb/byproject/bypixel/src/assets/iamge/unknoweduser.webp",
  },
});

let canvaspost = Mock.mock({
  conflicting: false,
  cooling: false,
  is_user_graded: false,
  user_level: 0,
  user_pixels_num: 0,
  group_pixels_num: 0,
});

let canDrawState = Mock.mock({
  state: true,
  last_paint_time: 1660225344,
});

module.exports = (middlewares, devServer) => {
  if (!devServer) {
    throw new Error("webpack-dev-server is not defined");
  }
  if (process.env.MOCK == "true") {
    middlewares.unshift({
      path: "/userqwer",
      middleware: (req, res) => {
        res.json({ ok: true });
      },
    });
    middlewares.unshift({
      path: "/user/token",
      middleware: (req, res) => {
        res.json(userToken);
      },
    });
    middlewares.unshift({
      path: "/user/group",
      middleware: (req, res) => {
        res.json(null);
      },
    });
    middlewares.unshift({
      path: "/user/info",
      middleware: (req, res) => {
        res.json(userInfo);
      },
    });
    middlewares.unshift({
      path: `/group/status`,
      middleware: (req, res) => {
        res.json(groupStatus);
      },
    });
    middlewares.unshift({
      path: `/task`,
      middleware: (req, res) => {
        res.json(task);
      },
    });
    middlewares.unshift({
      path: `/canvas`,
      middleware: (req, res) => {
        res.json(canvas);
      },
    });
    middlewares.unshift({
      path: `/canvaspost`,
      middleware: (req, res) => {
        res.json(canvaspost);
      },
    });
    middlewares.unshift({
      path: `/user/state`,
      middleware: (req, res) => {
        res.json(canDrawState);
      },
    });
    return middlewares;
  }
};

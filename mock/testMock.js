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
      level: 2,
      total_members_num: 0,
      total_pixels_num: 0,
    },
    {
      id: 2,
      name: "射日队",
      level: 3,
      total_members_num: 0,
      total_pixels_num: 0,
    },
  ],
});
let task = Mock.mock({
  task: "这是获取的任务内容 这是获取的任务内容 这是获取的任务内容 ",
});

let canvas = Mock.mock({
  canvas: [
    [
      "#",
      "#",
      "#76eaa3",
      "#76eaa3",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#76eaa3",
      "#76eaa3",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "",
      "",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#76eaa3",
      "#76eaa3",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#76eaa3",
      "#76eaa3",
      "#ffffff",
      "#ffffff",
      "",
      "",
      "",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#76eaa3",
      "#76eaa3",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#76eaa3",
      "#76eaa3",
      "#ffffff",
      "#ffffff",
      "",
      "",
      "",
    ],
    [
      "#ffffff",
      "#76eaa3",
      "#f6c173",
      "#f6c173",
      "#76eaa3",
      "#ffffff",
      "#76eaa3",
      "#f6c173",
      "#f6c173",
      "#76eaa3",
      "#ffffff",
      "#ffffff",
      "",
      "",
    ],
    [
      "#76eaa3",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#76eaa3",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#76eaa3",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#76eaa3",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#ffffff",
      "#f6c173",
      "#76eaa3",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#76eaa3",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#ffffff",
      "#f6c173",
      "#f6c173",
      "#76eaa3",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#76eaa3",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#ffffff",
      "#f6c173",
      "#76eaa3",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    [
      "#ffffff",
      "#ffffff",
      "#76eaa3",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#ffffff",
      "#f6c173",
      "#76eaa3",
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
      "#76eaa3",
      "#f6c173",
      "#f6c173",
      "#f6c173",
      "#76eaa3",
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
      "#76eaa3",
      "#f6c173",
      "#76eaa3",
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
      "#76eaa3",
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
      "#ffffff",
      "#76eaa3",
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
      "#76eaa3",
      "#76eaa3",
    ],
  ],
  last_paint: {
    pixel_position: [2, 3],
    time: 0,
    nickname: "NAME",
    headimgurl: "D:/MyWeb/byproject/bypixel/src/assets/iamge/unknoweduser.webp",
  },
  pixels_num: {
    group_1: 14,
    group_2: 23,
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
  last_paint_time: 1661157243075,
});

module.exports = (middlewares, devServer) => {
  if (!devServer) {
    throw new Error("webpack-dev-server is not defined");
  }
  if (process.env.VUE_APP_MOCK == "true") {
    middlewares.unshift({
      path: "/api/user/token",
      middleware: (req, res) => {
        res.json(userToken);
      },
    });
    middlewares.unshift({
      path: "/api/user/group",
      middleware: (req, res) => {
        res.json(null);
      },
    });
    middlewares.unshift({
      path: "/api/user/info",
      middleware: (req, res) => {
        res.json(userInfo);
      },
    });
    middlewares.unshift({
      path: `/api/group/status`,
      middleware: (req, res) => {
        res.json(groupStatus);
      },
    });
    middlewares.unshift({
      path: `/api/task`,
      middleware: (req, res) => {
        res.json(task);
      },
    });
    middlewares.unshift({
      path: `/api/canvas`,
      middleware: (req, res) => {
        res.json(canvas);
      },
    });
    middlewares.unshift({
      path: `/api/canvaspost`,
      middleware: (req, res) => {
        res.json(canvaspost);
      },
    });
    middlewares.unshift({
      path: `/api/user/state`,
      middleware: (req, res) => {
        res.json(canDrawState);
      },
    });
    return middlewares;
  }
};

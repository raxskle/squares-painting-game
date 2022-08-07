const Mock = require("mockjs");
let token = Mock.mock({
  id: "12345",
  token: "JWTTOKENabc",
  expire: 123456789,
});

let group = Mock.mock({
  group: 1,
});

let userinfo = Mock.mock({
  username: "@cname",
  "group|0-2": 2,
  level: 0,
});

let groupStatus = Mock.mock({
  green: {
    level: 0,
    members: 2,
  },
  orange: {
    level: 0,
    members: 2,
  },
});
let canvas = Mock.mock({
  canvas: [
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  latest_position: [5, 5],
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
        res.json(token);
      },
    });
    middlewares.unshift({
      path: "/user/group",
      middleware: (req, res) => {
        res.json(group);
      },
    });
    middlewares.unshift({
      path: "/user/info",
      middleware: (req, res) => {
        res.json(userinfo);
      },
    });
    middlewares.unshift({
      path: "/user/info",
      middleware: (req, res) => {
        res.json(userinfo);
      },
    });
    middlewares.unshift({
      path: `/group/status`,
      middleware: (req, res) => {
        res.json(groupStatus);
      },
    });
    middlewares.unshift({
      path: `/canvas`,
      middleware: (req, res) => {
        res.json(canvas);
      },
    });

    return middlewares;
  }
};

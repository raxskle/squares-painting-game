const { defineConfig } = require("@vue/cli-service");

let config = {
  transpileDependencies: true,
  publicPath: "/drill-battle/",
  outputDir: "dist",
  assetsDir: "",
  indexPath: "index.html",
};

if (
  process.env.VUE_APP_MOCK == "true" &&
  process.env.VUE_APP_MODE == "development"
) {
  config = {
    transpileDependencies: true,
    devServer: {
      host: "10.21.200.162",
      port: 8081,
      setupMiddlewares: require("./mock/testMock.js"),
    },
  };
}

module.exports = defineConfig(config);

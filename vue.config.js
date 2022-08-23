const { defineConfig } = require("@vue/cli-service");

let config = {
  transpileDependencies: true,
  publicPath: "./",
};

if (process.env.VUE_APP_MOCK == "true") {
  config = {
    transpileDependencies: true,
    devServer: {
      host: "192.168.0.105",
      port: 8081,
      setupMiddlewares: require("./mock/testMock.js"),
    },
    publicPath: "./",
  };
}

module.exports = defineConfig(config);

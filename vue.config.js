const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "192.168.0.105",
    port: 8081,
    setupMiddlewares: require("./mock/testMock.js"),
  },
});

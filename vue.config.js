const { defineConfig } = require("@vue/cli-service");
const { DefinePlugin } = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/movie.github.io/" : "/",

  configureWebpack: {
    plugins: [
      new DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
        __VUE_OPTIONS_API__: JSON.stringify(true), // Options API와 Composition API 병용 가능
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // 프로덕션에서 Vue DevTools 비활성화
      }),
    ],
  },
});

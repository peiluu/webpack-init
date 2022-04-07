const path = require("path");

const { resolve } = path;

const HtmlWebpackPlugin = require("html-webpack-plugin");
// const WebpackDevServer = require("webpack-dev-server");

module.exports = {
  // 入口
  entry: "./src/index.js",
  // 输出
  output: {
    path: resolve(`${__dirname}/dist`),
    filename: "./dist.js",
  },
  // 模式
  mode: "production",
  // 插件
  plugins: [
    // 处理html资源
    // 默认会创建一个html, 自动引入打包输出的所有资源(js, css)
    // 复制
    new HtmlWebpackPlugin({
      template: path.join("./src", "index.html"),
      filename: "index.html",
    }),
  ],

  // 模块
  module: {
    // loader配置, 处理webpack不识别的资源（样式、图片）
    rules: [
      // 处理less资源, use（多个loader）中的执行顺序 -- 从下到上
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.ts$/, use: "ts-loader" },
      // 处理单个loader，直接写loader
      {
        test: /\.([jpg|png|gif])$/,
        loader: "url-loader",
        options: {
          // 图片小于8kb, 就会被base64处理
          // -- 优点：减少请求数量（减轻服务器压力），缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 问题：因为url-loader默认使用es6模块化去解析，而html-loader引入图片是common.js 模块化，解析会出现问题
          // 解决：关闭url-loader的es6模块化，使用common.js解析
          esMoudle: false,
        },
      },
      {
        test: /\.html$/,
        // 专门处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）
        loader: "html-loader",
      },
    ],
  },
  // 解析模块路径
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
      "@/com": path.join(__dirname, "src/components"),
    },
  },

  // 开发服务器配置, devServe用来自动化重载（自动刷新） -- 热重载
  // 只会在内存中编译打包，不会有任何输出
  // 启动
  devServer: {
    // contentBase: resolve(__dirname + 'dist'),
    compress: true,
    host: "localhost",
    port: 8000,
    // 自动打开服务器
    open: true,
    proxy: {
      "/api": {
        // target: 'https://umch.med.gzhc365.com/', // 测试
        target: "https://umch.med.gzhc365.com/", // 开发
        // target: 'https://mch.med.gzhc365.com/', // 生产
        changeOrigin: true,
        // pathRewrite: { "^/api" : "" }
      },
    },
  },
};

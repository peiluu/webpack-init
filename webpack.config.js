/**
 *@description 开发环境配置 - 能让代码运行即可
 * 运行项目命令：
 * webpack 会把打包结果输出出去
 * npX webpack-dev-server 只会在内存中编译打包，没有输出
 */

const path = require("path");

// const { resolve } = path;
const { resolve } = path;
// html编译
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 开发环境服务器
// const WebpackDevServer = require("webpack-dev-server");

// 每次打包时，删除上次打包的残留文件，保证打出的包整洁
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 提取css成单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 压缩css
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// eslint 语法检查
// const ESLintPlugin = require("eslint-webpack-plugin");

/**
 * @description webpack配置遵循CommonJS模块化语法
 * require命令用于加载模块文件。require命令的基本功能是，读入并执行一个JavaScript文件
 * 然后返回该模块的exports对象。如果没有发现指定模块，会报错。
 */
module.exports = {
  // 入口
  entry: "./src/index.js",
  // 入口文件的输出
  output: {
    path: resolve(__dirname, "dist"),
    filename: "js/dist.js",
    // filename: "dist.js",
  },
  // 模式
  // mode: "production",
  mode: "development",

  // 插件 -- 压缩文件
  plugins: [
    /**
     * 处理html资源
     * 默认会创建一个html, 自动引入打包输出的所有资源(js, css)
     * 复制src下面的index.html
     */
    new HtmlWebpackPlugin({
      template: path.join("./src", "index.html"),
      filename: "index.html",
    }),

    new CleanWebpackPlugin({
      pathsToClean: ["dist"],
      cleanOptions: {
        root: path.resolve(__dirname),
        // exclude: ['shared.js'],
        verbose: true,
        dry: false,
      },
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      filename: "css/dist.css",
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin(),

    // eslint语法检查 - webpack5支持
    // new ESLintPlugin({
    //   // extensions: ["js"],
    //   // context: resolve("src"),
    //   // exclude: "/node_modules",
    //   // fix: true
    // }),
  ],

  // 配置解析模块的规则
  resolve: {
    // 配置解析模块的路径别名: 有点
    // resolve() 是获取当前运行文件夹的路径
    // __dirname指的是当前文件所在文件夹的绝对路径。
    alias: {
      "@": resolve(__dirname, "src"),
      "@/com": resolve(__dirname, "src/components"),
    },
    // 配置省略文件后缀名的规则，默认值是[".js", ".json"], ts文件需要自行配置
    extensions: [".js", ".json", ".ts", ".tsx"],
    // 告诉webpack解析模块是去找哪个目录, 先找当前目录node_modules，没有的话会一层一层往上找
    // 可以指定从绝对路径开始找
    // module: [resolve(__dirname, "node_modules"), "node_modules"],
  },

  // 模块
  module: {
    // loader配置, 处理webpack不识别的资源（样式、图片）、 兼容性处理
    rules: [
      // 处理less资源, use（多个loader）中的执行顺序 -- 从下到上
      // css-loader把样式文件打到js文件中，
      // { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },

      // MiniCssExtractPlugin.loader取代style-loader, 提取css单独成文件
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },

      {
        test: /\.css$/,
        use: [
          "style-loader",
          // MiniCssExtractPlugin.loader
          "css-loader",
          {
            // 压缩css
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                // postcss的插件
                // require("postcss-preset-env")(),
              ],
            },
          },
        ],
      },
      { test: /\.ts$/, use: ["ts-loader"] },

      {
        // 处理css中图片资源
        test: /\.([jpg|png|gif])$/,
        loader: "url-loader", // 处理单个loader，直接写loader
        options: {
          // 图片小于8kb, 就会被base64处理
          // -- 优点：减少请求数量（减轻服务器压力），缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,

          // 对生成的base64图片进行重命名，hash值只取10位，加上原本的文件名后缀
          name: "[hash:10].[ext]",

          // 问题：因为url-loader默认使用es6模块化去解析，而html-loader引入图片是CommonJS 模块化，解析会出现问题
          // 解决：关闭url-loader的es6模块化，使用CommonJS解析
          // esMoudle: false,
          // 自定义输出路径
          outputPath: "imgs",
        },
      },
      {
        // 处理html中的图片资源
        test: /\.html$/,
        // 专门处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）
        loader: "html-loader",
      },
      {
        // 处理其他资源(排除已经处理过的资源)
        exclude: /\.(html|js|ts|css|less|gif|jpg|png)/,
        loader: "file-loader",
        options: {
          // 对生成文件进行重命名，hash值只取10位，加上原本的文件名后缀
          name: "[hash:10].[ext]",
          options: {
            // 自定义输出路径
            outputPath: "media",
          },
        },
      },

      /**
       * webpack5不支持eslint-loader
       * eslint 配置 - 语法检查 eslint-loader eslint
       * 只检查自己写的源代码，第三方的库是不是检查的
       * 配置检查规则:
       * package.json中eslintConfig中设置
       * airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint
       */
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader",
      //   options: {},
      // },

      /**
       * js兼容性处理 - @bable/core bable-loader @bable/preset-env
       */
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "bable-loader",
      //   options: {
      //     // 预设：指示bable做怎样的兼容性处理
      //     presets: ["@bable/preset-env"],
      //   },
      // },
    ],
  },

  // 开发服务器配置, devServe用来自动化重载（自动刷新） -- 热重载
  // 只会在内存中编译打包，不会有任何输出
  // 启动
  devServer: {
    // 路径
    // contentBase: resolve(__dirname + 'dist'),
    // 启用gzip压缩

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

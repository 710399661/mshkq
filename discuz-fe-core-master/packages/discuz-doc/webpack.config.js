// @ts-check
const path = require("path");
const webpack = require("webpack");
const HappyPack = require("happypack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const API_SDK_MAP = require("./engineering/readApiSdkInfo");

// 整个项目的根目录
const ROOT = path.resolve(__dirname, "../discuz-design/");

// 组件项目根目录
const COMPONENT_ROOT = path.resolve(ROOT, "components");

const SDK_ROOT = path.resolve(__dirname, "../discuz-sdk");

const CLI_ROOT = path.resolve(__dirname, "../discuz-cli");

const PLUGIN_CENTER_ROOT = path.resolve(__dirname, "../discuz-plugin-center");

// 网站项目更目录
const SITE_ROOT = path.resolve(__dirname);

const mode =
  process.env.NODE_ENV === "development" ? "development" : "production";
const devMode = mode === "development";

const babelOptions = {
  cacheDirectory: true,
  babelrc: false,
  retainLines: true,
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        targets: { browsers: ['> 1%', 'last 2 versions', 'not ie <= 9'] },
        corejs: 3,
        modules: "commonjs",
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [
    devMode && "react-refresh/babel",
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-decorators", {
      legacy: true
    }],
  ].filter(Boolean),
};

const name = "dzq-design-web-app";
const appEntry = [path.resolve(SITE_ROOT, "app")];

const alias = {
  "@app": path.resolve(SITE_ROOT, "app"),
  "@discuzq/design": COMPONENT_ROOT,
  "@discuzq/sdk": SDK_ROOT,
  "@discuzq/cli": CLI_ROOT,
  "@discuz/plugin-center": PLUGIN_CENTER_ROOT,
  "@babel/runtime": path.resolve(__dirname, "./node_modules/@babel/runtime"),
  react: path.resolve("./node_modules/react"),
  "react-dom": path.resolve("./node_modules/react-dom"),
};

/**
 * Webpack 配置
 * @type {import('webpack').Configuration}
 */
module.exports = {
  name,
  mode,
  devtool: devMode ? "source-map" : false,
  entry: {
    app: appEntry,
  },
  output: {
    // publicPath,
    path: path.resolve(__dirname, "dist"),
    filename: devMode ? "[name].js" : "[name].[hash:10].js",
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: "happypack/loader?id=tsx",
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: "happypack/loader?id=jsx",
        exclude: /node_modules/,
      },
      {
        test: /\.md$/,
        use: "happypack/loader?id=md",
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
            },
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader"
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
            },
          },
          {
            loader: "css-loader"
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
            },
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 100 * 1024,
          },
        }, ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 5000,
      maxSize: 4000000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        react: {
          name: "react",
          test: (module) => {
            return /react|prop-types/.test(module.context);
          },
          chunks: "initial",
          priority: 100,
        },
        dzq: {
          name: "dzq-design",
          test: (module) => {
            return /design/.test(module.context);
          },
          chunks: "initial",
          priority: 10,
        },
        video: {
          name: "videojs",
          test: (module) => {
            return /videojs/.test(module.context);
          },
          chunks: "initial",
          priority: 10,
        },
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias,
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, "./node_modules"),
      path.resolve(ROOT, "node_modules"),
      path.resolve(SITE_ROOT, "engineering"),
    ],
  },

  performance: {
    // 限制最大 1M
    maxEntrypointSize: 1 * (2 << 20),
    maxAssetSize: 1 * (2 << 20),
  },

  devServer: {
    hot: true,
    port: 9999,
    publicPath: "/",
    contentBase: ["./dist", "./engineering/static"],
    disableHostCheck: true,
  },

  // 配置插件
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.DISCUZ_ENV": JSON.stringify("web"),
      "process.env.API_REFERENCE_MAP": JSON.stringify(API_SDK_MAP),
    }),
    // 编译错误时不输出文件
    new webpack.NoEmitOnErrorsPlugin(),
    // 定义环境变量
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": `"${mode}"`,
    }),
    // Support webpack hot module
    new webpack.HotModuleReplacementPlugin(),
    // Template
    new HtmlWebpackPlugin({
      template: "./engineering/static/index.html",
    }),

    // 预渲染，用来生成 SEO 静态代码
    // new PrerenderSPAPlugin({
    //   // Required - The path to the webpack-outputted app to prerender.
    //   staticDir: path.join(__dirname, 'dist'),
    //   // Required - Routes to render.
    //   routes: [ '/', '/#/sdk/install', '/#/components/install' ],
    // }),
    // CSS
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash:10].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash:10].css",
    }),
    new CopyPlugin({
      patterns: [{
        from: "engineering/static/assets",
        to: "assets"
      }],
    }),
    // 加速加速
    new HappyPack({
      id: "tsx",
      verbose: false,
      loaders: [{
          loader: "babel-loader",
          options: babelOptions,
        },
        {
          loader: "ts-loader",
          options: {
            happyPackMode: true,
          },
        },
      ],
    }),
    new HappyPack({
      id: "jsx",
      verbose: false,
      loaders: [{
        loader: "babel-loader",
        options: babelOptions,
      }, ],
    }),
    new HappyPack({
      id: "md",
      verbose: false,
      loaders: [{
          loader: "babel-loader",
          options: babelOptions,
        },
        {
          loader: "./engineering/doc-loader",
        },
      ],
    }),
    devMode && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
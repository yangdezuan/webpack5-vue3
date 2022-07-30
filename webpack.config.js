const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  devtool: false,
  mode: 'development',
  entry: './src/main.js',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.scss'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  /* optimization: {
    runtimeChunk: 'single',
  }, */
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }, // 它会应用到普通的 `.js` 文件以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      //处理css，注意这三个loader的顺序
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.ts$/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
        // 配置资源输出位置和名称
        generator: {
          // 将图片文件输出到 imgs 目录中
          // 将图片文件命名 [name][hash:6][ext][query]
          // [name]: 之前的文件名称
          // [hash:6]: hash值取6位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: 'imgs/[name][hash:6][ext][query]',
        },
      },
    ],
  },
  // 插件就让多一个功能
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test',
      template: './public/index.html', // 这是html模板存放的地址
      filename: './index.html',
    }),
    new DefinePlugin({
      BASE_URL: '"./"',
      __VUE_OPTIONS_API__: false, // 是否支持optionsApi
      __VUE_PROD_DEVTOOLS__: false, // 在生成环境是否支持devtools
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: 'public',
    //       globOptions: {
    //         ignore: ['*/index.html'],
    //       }
    //     }
    //   ]
    // }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    host: '127.0.0.1', // 启动服务器域名,可以不配置或改成0.0.0.0 这样在其他ip下也可以运行
    port: '3000', // 启动服务器端口号
    historyApiFallback: true,
    open: true, // 是否自动打开浏览器
    compress: true, // 启用gzip压缩
    hot: true,
    liveReload: true,
    //https: true,
    proxy: {
      '/api': {
        // 匹配规则
        target: 'https://other-server.example.com', // 代理目标地址
        secure: false, // 接受在 HTTPS 上运行且证书无效的后端服务器
        changeOrigin: true, // 服务器源跟踪
        pathRewrite: { '^/api': '' }, // 路径重写
      },
    },
  },
}

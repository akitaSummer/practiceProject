const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动生成html文件的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清除之前打包的文件

module.exports = {
  // entry: {
  //     lodash: './src/js/lodash.js',
  //     main: './src/js/entry.js',
  // },
  entry: './src/js/entry.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    // publicPath: "http://cdn.com.cn",
    // filename: '[name]_[hash].[ext]',
    publicPath: "/",
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: "css-loader", // 若要配置loader，需要使用对象写法
            options: {
              importLoaders: 2, // 通过import引入的css文件需要再走下面两个loader
              modules: true, // 模块化css，通过style.xxx定义class
            }
          },
          'sass-loader', // webpack在打包时是有顺序的，由下至上，由右至左
          'postcss-loader', // 为CSS添加-webkit等兼容开头
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            // placeholder：占位符
            name: '[name].[ext]', // 打包文件后，文件名为原文件名
            outputPath: 'images/'
          }
        }]
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader' // 打包字体文件
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 第三方库除外
        loader: 'babel-loader', // 配置babel-laoder
        options: { // 或者在.babelrc中配置
          presets: [
            ["@babel/preset-env", {// es6语法转换es5语法
              useBuiltIns: "usage", // 根据业务代码，添加@babel/polyfill兼容的内容
              targets: {
                chrome: "67", // 运行的环境
              }
            }],
          ],
          plugins: [["@babel/plugin-transform-runtime", { // @babel/polyfill会污染全局环境，制作库时，需要使用@babel/plugin-transform-runtime
            "corejs": 2,
            "helpers": true,
            "regenerator": true,
            "useESModules": false,
          }],
            "dynamic-import-webpack", // 动态import
          ]
        }
      }
    ]
  },
  plugins: [ // plugins可以在webpack运行到某个时刻的时候，帮你做一些事情
    new HtmlWebpackPlugin({ template: './index.html' }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, './'), // 设置CleanWebpackPlugin的根目录
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all", // 代码分割
    }
  }
}

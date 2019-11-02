// 基础打包配置
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // 生成创建html入口文件的插件
            template: path.resolve(__dirname, '../index.html')
        }),
        new VueLoaderPlugin(),
        require('autoprefixer'),
        new AutoDllPlugin({
            inject: true, // 自动将打包好的第三方库插入HTML
            debug: true,
            filename: '[name]_[hash],js',
            path: './dll', // 打包后的路径
            entry: {
                vendor: ['vue', 'vue-router', 'vuex'] // 要打包的库
            }
        }),
        new webpack.optimize.SplitChunksPlugin(), // 提取公共代码
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js', // 引入vue更方便
            '@': path.resolve(__dirname, '../src'),
        },
        extensions: ['*', '.js', '.json', '.vue'], //省略后缀
    }
}
const webpack = require('webpack')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


// 清空基本配置列表
webpackBaseConfig.plugins = []

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/dist/',
        // 将入口文件重命名为带有20位hash值的唯一文件
        filename: '[name].[hash].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all', //同时分割同步和异步代码,推荐。
        }
    },
    plugins: [
        new ExtractTextPlugin({
            // 提取css, 并重命名为带有20位hash的唯一文件
            filename: '[name].[hash].js',
            allChunks: true
        }),
        //定义当前node环境为生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_DEV: "production"
            }
        }),
        // 压缩js
        new UglifyJSPlugin({
            uglifyOptions: {
                warning: "verbose",
                ecma: 6,
                beautify: false,
                compress: false,
                comments: false,
                mangle: false,
                toplevel: false,
                keep_classnames: true,
                keep_fnames: true
            }
        }),
        // 提取模板, 并保存入口html文件
        new HtmlwebpackPlugin({
            filename: '../dist/index_prod.html',
            template: './index.html',
            inject: false
        }),
        new VueLoaderPlugin()
    ]
})
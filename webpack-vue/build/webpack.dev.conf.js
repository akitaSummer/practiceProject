// 开发环境配置
const merge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.conf')
const webpack = require(webpack)

module.exports = merge(baseConfig, {
    mode: 'development', // 设置为开发环境
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        open: true, // 打开浏览器
        hot: true, // 开启热更新
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})
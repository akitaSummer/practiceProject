// 生产环境配置
const merge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.conf')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(baseConfig, {
    mode: 'production', // 生产环境
    devtool: 'source-map',
    module: {
        rules: []
    },
    plugins: [
        new CleanWebpackPlugin({ // 打包之前将文件先清除
            cleanOnceBeforeBuildPatterns: ['dist/'], // 删除的绝对根路径
            verbose: true, // 控制台打印日志
            dry: false, // 删除文件夹
            root: path.resolve(__dirname, '../'),
        })
    ]
})
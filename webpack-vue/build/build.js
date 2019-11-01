// Node打包用脚本
const webpack = require('webpack')
const config = require('./webpack.prod.conf')
webpack(config, (error, stats) => {
    if (error || stats.hasErrors) {
        console.error(error)
        return
    }
    console.log(stats.toString({
        chunks: false, //构建过程中没有输出
        colors: true // 控制台显示颜色
    }))
})
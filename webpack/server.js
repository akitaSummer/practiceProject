const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.dev.js')
// 在node中使用webpack
const complier = webpack(config)

const app = express()
app.use(webpackDevMiddleware(complier, { // 打包文件
  publicPath: config.output.publicPath
}))

app.listen(8080, () => {
  console.log('server is runing')
})

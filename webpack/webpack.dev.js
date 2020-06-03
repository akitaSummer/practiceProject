const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const devConfig = {
    mode: 'development',
    // source-map 默认开启，是打包文件对原文件的映射，通过source-map，我们就可以知道源文件哪行出错
    devtool: 'cheap-module-eval-source-map', // inline- 开头：将.map文件存至js文件最后一行 cheap- 开头：简化提示，只告诉哪行出错 module- 开头： 包含module的提示 eval-是通过eval储存映射内容
    // production devtool: 'cheap-module-source-map'
    devServer: {
        contentBase: './dist', // 打包文件位置
        open: true, // 自动打开浏览器
        // historyApiFallback: true, // 解决单页面路由browser后端问题
        historyApiFallback: {
            rewrites: [{
                from: /abc.html/,
                to: '/views/landing.html' // 也可传入function（content） {} 结合逻辑动态返回路径
            }]
        },
        proxy: {
            // '/api': 'http://localhost:3000', // 配置跨域代理
            '/api': {
                target: 'http://loaclhost:3000',
                secure: false, // 对https网址的请求转发
                pathRewrite: {
                    'header.json': 'demo.json' // 请求header.json文件会返回demo.json文件
                },
                bypass: function (req, res, proxyOptions) { // 根据特定请求，返回特定内容
                    if (req.header.accept.indexOf('html')) {
                        return '/index.html'
                    }
                },
                changeOrigin: true, // 突破Origin限制
                overlay: true, // eslint检测出错时，会弹出页面提醒
            }
        },
        // port: 8888, // 配置端口
        hot: true, // 热模块加载
        hotOnly: true // 即使hot未生效，也不刷新页面
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
            }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热加载插件
    ],
    optimization: {
        usedExports: true, // development 开发环境下，设置Tree shaking
    }
}

module.exports = devConfig

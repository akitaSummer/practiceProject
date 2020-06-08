const commonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将css从js中抽离出来，单独作为css文件引入，HMR目前不支持
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // css文件压缩
const WorkboxPlugin = require('workbox-webpack-plugin')

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // 将style-loader更换为MiniCssExtractPlugin.loader
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        })
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    }
}

module.exports = prodConfig

module.exports = merge(baseConfig, {
    mode: 'production', // 生产环境
    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // 将style-loader更换为MiniCssExtractPlugin.loader
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        }),
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    }
})
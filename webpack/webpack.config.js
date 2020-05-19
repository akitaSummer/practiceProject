const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动生成html文件的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清除之前打包的文件

module.exports = {
    // entry: {
    //     main: './src/js/entry.js'
    // },
    entry: './src/js/entry.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
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
                    'css-loader',
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        new CleanWebpackPlugin(),
    ],
}

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动生成html文件的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清除之前打包的文件

module.exports = {
    entry: './js/index.ts',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: ['babel-loader', 'ts-loader'],
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, './index.html') }),
        new CleanWebpackPlugin()
    ]
}
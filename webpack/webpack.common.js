const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动生成html文件的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清除之前打包的文件
const webpack = require('webpack')
const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')
const merge = require('webpack-merge')

const commonConfig = {
    // entry: {
    //     lodash: './src/js/lodash.js',
    //     main: './src/js/entry.js',
    // },
    entry: './src/js/entry.js',
    // externals: ['lodash'], // 打包时忽略的库
    resolve: {
        extensions: ['.js', '.jsx'], // 省略后缀，从左到右查找
        mainFile: ['index', 'child'], // 未写文件名，则优先加载的文件名
        alias: {
            path: path.resolve(__dirname, './src/') // 路径别名
        }
    },
    externals: {
        lodash: {
            root: '_', // 要求src条件下，需要注入'_'，作为lodash
            commonjs: 'lodash', // commonjs条件下，要求加载时，必须为lodash
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        // publicPath: "http://cdn.com.cn",
        // filename: '[name]_[hash].[ext]',
        publicPath: "/",
        filename: 'bundle.js', // 使用contenthash，只有当源代码改变时，才会改变输出名，但在热更新情况下不能使用，可以做到重新打包代码上线的时候，用户只需要更新有变化的代码，而没有变化的代码，用户可以直接使用本地的缓存
        chunkFilename: "[name].chunk.js",
        libraryTarget: 'umd', // 在制作库时需要，保证任何引用方式都能正确引用
        library: 'library', // 可以通过src标签引入，并且使用library作为全局变量，如果libraryTarget为this，则library会挂载到全局this
    },
    module: {
        rules: [{
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
            },
            {
                test: /\.(eot|ttf|svg|woff|woff2)$/,
                use: {
                    loader: 'file-loader', // 打包字体文件
                    force: 'pre', // 强制loader优于其他loader
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 第三方库除外
                use: [{
                        loader: 'babel-loader', // 配置babel-loader
                        query: { // 或者在.babelrc中配置
                            presets: [
                                ["@babel/preset-env", { // es6语法转换es5语法
                                    useBuiltIns: "usage", // 根据业务代码，添加@babel/polyfill兼容的内容
                                    targets: {
                                        chrome: "67", // 运行的环境
                                    }
                                }],
                            ],
                            plugins: [
                                ["@babel/plugin-transform-runtime", { // @babel/polyfill会污染全局环境，制作库时，需要使用@babel/plugin-transform-runtime
                                    "corejs": 2,
                                    "helpers": true,
                                    "regenerator": true,
                                    "useESModules": false,
                                }],
                                "dynamic-import-webpack", // 动态import
                            ]
                        }
                    },
                    // {
                    //   loader: 'imports-loader?this=>window', // 设置模块中的this为window而不是模块本身
                    // },
                    {
                        loader: "eslint-loader", // 配置eslint在打包时检测
                        options: {
                            fix: true // 简单问题自动修复
                        },
                    }
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_nodules/
            }
        ]
    },
    plugins: [ // plugins可以在webpack运行到某个时刻的时候，帮你做一些事情
        new HtmlWebpackPlugin({ template: './index.html' }),
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, './'), // 设置CleanWebpackPlugin的根目录
        }),
        new webpack.ProvidePlugin({ // 设置模块中的变量使用的模块
            $: 'jquery',
            _: 'lodash',
            _join: ['lodash', 'join'] // 使用lodash.join
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all", // 代码分割
            minSize: 30000, // 对代码分割的最小文件大小
            maxSize: 0, // 代码分割文件最大大小
            minChunks: 1, // 代码分割文件至少被chunk或作为chunk引入的次数
            maxAsyncRequests: 5, // 总共最多分割成多少代码分割文件
            maxInitialRequests: 3, // 入口文件进行分割时最多分割成多少文件
            automaticNameDelimiter: "~", // 默认情况下，webpack将使用块的来源和名称生成名称, automaticNameDelimiter用于修改连接符
            name: true, // 拆分模块名称，true会根据模块和缓存键值对自动选择一个名称
            cacheGroups: { // 决定拆分分割模块分割至哪个文件中，缓存分组
                vendors: {
                    test: /[\\/]node_modules[\\/]/, // 模块保存的分割代码
                    priority: -10, // 打包到此文件的优先级
                    filename: 'vendors.js' // 模块名字
                },
                // default: false, // 默认分割文件放置地址
                default: {
                    priority: -20,
                    reuseExistingChunk: true, // 是否复用之前打包过的模块
                    filename: 'common.js'
                }
            }
        }
    }
}

module.exports = (env) => {
    if (env && env.production) {
        return merge(commonConfig, prodConfig)
    } else {
        return merge(commonConfig, devConfig)
    }
}
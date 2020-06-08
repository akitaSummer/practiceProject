class CoyprightWebpackPlugin { // 插件是一个类
    constructor(options) {
        console.log('plugin 被使用了')
    }
    apply(compiler) { // webpack会调用apply方法 compiler是webpack实例
        compiler.hooks.emit.tapAsync('CoyprightWebpackPlugin', (compilation, callback) => { //emit 是在文件被放置于dist目录时调用
            // compilation 存放此次打包内容， compiler存放所有打包内容
            console.log(compilation.assets) // assets中存放了打包结果
            compilation.assets['copyright.txt'] = {
                source: function() { // 内容
                    return 'copyright'
                },
                size: function() { // 大小
                    return 9
                }
            }
            callback() // 必须调用
        })
        compiler.hooks.compile.tap('CoyprightWebpackPlugin', (compilation) => {
            // compile 是同步函数
            console.log('compile')
        })
    }
}

module.exports = CoyprightWebpackPlugin
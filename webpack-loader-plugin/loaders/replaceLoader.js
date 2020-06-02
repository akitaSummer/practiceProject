const loaderUtils = require('loader-utils') // 官方推荐的query获取方法

module.exports = function(source) { // loader 不能用箭头函数 source为导入的文件源代码
  // console.log(this.query) // this.query 是loader中option传递的参数
  const options = loaderUtils.getOptions(this) // loader-utils会自动将this中query传递到options中
  // return source.replace('akita', options.name)
  const result = source.replace('akitaSummer', options.name)

  this.callback(null, result) // 可以用callback进行处理

  // const callback = this.async()
  // setTimeout(() => {
  //   callback(result) // 异步处理
  // }, 1000)
}

// this.callback(
//   err: Error | null,
//   content: string | Buffer,
//   sourceMap?: SourceMap,
//   meta?: any
// )

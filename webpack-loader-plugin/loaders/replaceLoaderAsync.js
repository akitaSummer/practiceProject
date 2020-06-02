const loaderUtils = require('loader-utils')

module.exports = function(source) {
  const options = loaderUtils.getOptions(this)
  const result = source.replace('akita', options.name)
  const callback = this.async()
  setTimeout(() => {
    callback(null, result) // 异步处理
  }, 1000)
}

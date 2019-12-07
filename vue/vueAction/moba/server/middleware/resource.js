module.exports = options => {
  return async(req, res, next) => { // 中间件, 在router前调用
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }
}

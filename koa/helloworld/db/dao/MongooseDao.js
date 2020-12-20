function MongooseDao(Model) {
    if (!Model) {
        throw new Error(`${Model} is not valid, please check if it is a mongoose model!`)
    }
    this.model = model
    this.pagesize = 20
}

MongooseDao.prototype.query = MongooseDao.prototype.find = MongooseDao.prototype.getByQuery = async function(query) {
    return await this.model.find(query)
}

MongooseDao.prototype.count = async function(query) {
    return await this.model.count(query ? query : {})
}

MongooseDao.prototype.update = async function(condition, update, _options) {
    if (!condition || !update) {
        throw new Error('MongooseDao.prototype.updat param is not valid!')
    } else {
        const opt = {
            multi: true,
            ..._options
        }
        return this.model.update(condition, update, opt)
    }
}

exports = module.exports = MongooseDao
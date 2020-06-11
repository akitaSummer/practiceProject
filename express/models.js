const mongoose = require('mongoose') // 引入mongoose
mongoose.connect('mongodb://localhost:27017/express-test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }) // 连接mongodb数据库

const Product = mongoose.model('Product', new mongoose.Schema({
        title: String
    })) // 创建一个集合（表），schema作为结构

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true, // 是否唯一
    },
    password: {
        type: String,
        set(val) { // 设置储存值, 只能使用同步方法
            return val
        }
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = {
    Product,
    User
}
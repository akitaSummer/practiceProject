const mongoose = require('mongoose')
const mongooseBaseUserPlugin = require('../plugins/mongoose-base-user-plugin')

const MyUserSchema = new mongoose.Schema({
    invite_code: String,
    phone_number: Number,
    address: String,
    unionid: String,
    nickname: String,
    sex: String,
    language: String,
    city: String,
    province: String,
    country: String,
    headimgUrl: String,
    privilege: [],
    create_at: {
        type: Date,
        default: Date.now()
    }
})

MyUserSchema.plugin(mongoose)

module.exports = mongoose.model('MyUser', MyUserSchema)
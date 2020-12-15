const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const lastMod = require('../plugins/lastMod')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number
    },
    invite_code: {
        type: String
    },
    address: {
        type: String
    }
})

// 类上扩展
UserSchema.statics.findByUsername = async function(username) {
    return await this.findOne({
        username
    })
}

// 对象上扩展
UserSchema.methods.is_exist = async function() {
    const query
    query = {
        username: this.username,
        password: this.password
    }
    return await this.model('UserModel').findOne(query)
}

// 虚拟属性
UserSchema.virtual('is_valid').get(function() {
    if (this.phone_number === undefined || this.invite_code === undefined) {
        return false
    }
    return this.invite_code.length >= 2 && this.phone_number > 10000000
})

const _sp = (str) => str.replace(/\n/g, '').trim().split('-')

UserSchema.virtual('province').get(function() {
    const array = _sp(this.address)
    return array[0]
})

UserSchema.virtual('city').get(function() {
    const array = _sp(this.address)
    return array[1]
})

UserSchema.virtual('county').get(function() {
    const array = _sp(this.address)
    return array[2]
})

UserSchema.virtual('detail_address').get(function() {
    const array = _sp(this.address)
    return array[2]
})

// 回调钩子
UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(this._salt_bounds)
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash
        return next()
    } catch (e) {
        console.log(e)
        return next()
    }
})

UserSchema.statics.login = async function(username, password) {
    try {
        const user = await this.findOne({ username })
    } catch (e) {
        return {
            code: -1,
            msg: `${username} is not exist!`,
            error: e
        }
    }
    try {
        return await bcrypt.compare(password, user.password)
    } catch (e) {
        return {
            code: -1,
            msg: `password is incorrect, please check it again!`,
            error: e
        }
    }
}

UserSchema.plugin(lastMod, { index: true })

module.exports = mongoose.model('User', UserSchema)
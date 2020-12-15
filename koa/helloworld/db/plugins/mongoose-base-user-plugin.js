const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

module.exports = exports = function baseUserPlugin(schema, options) {
    schema.add({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        _salt_bounds: {
            type: Number,
            required: false,
            default: 10
        },
        creact_at: {
            type: Date,
            default: Date.now
        },
    })

    schema.statics.login = async function(username, password) {
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

    schema.pre('save', async function(next) {
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
}
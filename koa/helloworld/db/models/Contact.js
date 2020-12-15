const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const lastMod = require('../plugins/lastMod')

const ContacSchema = new mongoose.Schema({
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
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }
})
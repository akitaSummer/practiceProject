module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/node_vue_moba', { userNewUrlParser: true })
    const conn = mongoose.connection
    conn.on('connected', () => {
        console.log('mongoose connected')
    })
    require('require-all')(__dirname + '/models')
}
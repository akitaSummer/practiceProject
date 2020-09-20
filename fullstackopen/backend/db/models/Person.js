const mongoose = require('mongoose')

const Person = mongoose.Schema({
  name: String,
  number: String
})

module.exports = mongoose.Model('Person', Person)

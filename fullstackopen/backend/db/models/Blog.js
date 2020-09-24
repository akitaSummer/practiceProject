const mongoose = require('mongoose')

const Blog = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = mongoose.model('Blog', Blog)

const Router = require('express').Router()

const Blog = require('mongoose').model('Blog')

Router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

Router.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = Router

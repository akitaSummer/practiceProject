const Blog = require('mongoose').model('Blog')

const dummy = (blogs) => {
  return 1
}

const totalLikes = async (blog) => {
  const findResult = await Blog.find({ name: blog.name })
  if (findResult.length === 0) {
    await new Blog(blog).save()
  }
  return (await Blog.find({})).length
}

module.exports = {
  dummy,
  totalLikes
}

require('../db/db')()
const { dummy, totalLikes } = require('./index')

describe('dummy', () => {

  test('dummy returns one', () => {
    const blogs = []

    const result = dummy(blogs)
    expect(result).toBe(1)
  })
})


describe('total likes', () => {
  const listWithOneBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    }

  test('when list has only one blog, equals the likes of that',async () => {
    const result = await totalLikes(listWithOneBlog)
    expect(result).toBe(1)
  })
})

const Blog = require('../models/blog')
const mongoose = require('mongoose')

const initialBlogs = [
  {
    title: 'blog 1',
    author: 'author blog 1',
    url: 'url blog 1',
    likes: 23
  },
  {
    title: 'blog 2',
    author: 'author blog 2',
    url: 'url blog 2',
    likes: 99
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs
}

const isValidId = (id) => {
  return mongoose.Types.ObjectId.isValid(id)
}

module.exports = {
  blogsInDb, initialBlogs,isValidId
}

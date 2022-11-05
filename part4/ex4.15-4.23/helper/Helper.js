const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')

const initialBlogs = [
  {
    title: 'blog 1',
    author: 'author blog 1',
    url: 'url blog 1',
    likes: 23,
    user:'63668aa7fb3f36324d9afb36'
  },
  {
    title: 'blog 2',
    author: 'author blog 2',
    url: 'url blog 2',
    likes: 99,
    user:'63668aa7fb3f36324d9afb36'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs
}

const isValidId = (id) => {
  return mongoose.Types.ObjectId.isValid(id)
}

const usersInDb = async () =>{
  const users = await User.find({})
  return users.map(u=>u.toJSON())
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

module.exports = {
  blogsInDb, initialBlogs,isValidId,usersInDb,getTokenFrom
}

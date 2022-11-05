const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const helper = require('../helper/Helper')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, _id: 1 })
  return response.status(200).json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = await User.findById(request.user)
  if (!user) {
    return response.status(400).json({ error: 'User was not found' })
  }
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Missing properties' })
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: request.user
  })
  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  return response.status(201).json(savedBlog)
})
blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const isValid = helper.isValidId(id)
  if (!isValid) {
    return response.status(400).json({ error: ' malformatted blog ID ' })
  }
  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: ' Blog was not found ' })
  }
  response.status(200).json(blog)
})
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const isValid = helper.isValidId(id)
  if (!isValid) {
    return response.status(400).json({ error: ' malformatted blog ID ' })
  }
  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: ' Blog was not found ' })
  }
  if (blog.user.toString() !== request.user) {
    return response.status(403).json({ error: ' Cannot modify resources' })
  }
  await blog.remove()
  response.status(200).json({ success: 'success' })
})

blogsRouter.patch('/:id', async (request, response) => {
  const id = request.params.id
  const isValid = helper.isValidId(id)
  const likes = request.body.likes
  if (!isValid) {
    return response.status(400).json({ error: ' malformatted blog ID ' })
  }
  if (!likes) {
    return response.status(400).json({ error: ' Missing likes property ' })
  }
  const res = await Blog.findByIdAndUpdate(id, { likes }, { new: true })
  return response.status(200).json(res)
})
module.exports = blogsRouter

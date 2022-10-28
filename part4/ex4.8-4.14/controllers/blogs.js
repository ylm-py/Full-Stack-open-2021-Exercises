const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const helper = require('../helper/Helper')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).send('Missing properties')
  }
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const isValid = helper.isValidId(id)
  if (!isValid) {
    return response.status('400').send('malformatted ID')
  }
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).send('Resource not found')
  }
  response.status(200).json(blog)
})
blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const isValid = helper.isValidId(id)
  if (!isValid) {
    return response.status('400').send('malformatted ID')
  }
  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).send('Not found')
  }

  Blog.findByIdAndRemove(id, (err, docs) => {
    if (err) {
      return response.send(err)
    } else {
      return response.send(200, 'deleted')
    }
  })
})

blogsRouter.patch('/:id', async (request, response) => {
  const id = request.params.id
  const isValid = helper.isValidId(id)
  const likes = request.body.likes
  if (!isValid || !likes) {
    return response.status(400).send('Malformatted Id or missing properties')
  }
  const res = await Blog.findByIdAndUpdate(id, { likes }, { new: true })
  return response.status(200).json(res)
})
module.exports = blogsRouter

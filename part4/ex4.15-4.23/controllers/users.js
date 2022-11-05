const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (username.length < 3 || password < 3) {
    return response.status(400).json({
      error: 'username and password must be minimum 3 characters length'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const existingUser = await User.findOne({ username })

  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  return response.status(200).json(users)
})

module.exports = usersRouter

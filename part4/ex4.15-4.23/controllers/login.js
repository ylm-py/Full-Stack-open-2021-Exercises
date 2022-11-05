const User = require('../models/user')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'username or password incorrect' })
  }

  const loggedUser = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(loggedUser, process.env.SECRET)

  return res.status(200).json({
    token, username: user.username, name: user.name
  })
})

module.exports = loginRouter

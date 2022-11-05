const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  passwordHash: {
    type: String
  },
  name: {
    type: String
  },
  blogs: [
    {
      default: null,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = document._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User

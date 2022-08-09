const mongoose = require('mongoose')
require("dotenv").config()


const url = process.env.MONGODB_URI

const db = mongoose.connect(url , { useNewUrlParser: true })
db.then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
  name:String,
  number:String,
  date: Date,
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


module.exports = mongoose.model('Person', personSchema)


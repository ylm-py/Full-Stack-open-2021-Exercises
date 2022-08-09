const mongoose = require('mongoose')
require('dotenv').config()


const url = process.env.MONGODB_URI

const db = mongoose.connect(url , { useNewUrlParser: true })
db.then(() => {
  console.log('connected to MongoDB')
})
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    validate:{
      validator: function(v) {
        return /^[a-zA-Z]*$/.test(v)
      },
      message: props => `${props.value} is not a valid name!`
    }

  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 12,
    validate: {
      validator: function (v) {
        return /^[0-9]{8,12}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
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


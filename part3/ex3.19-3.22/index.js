const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./Models/person')
require('dotenv').config()

const errorHandler = (error, request, response) => {
  // console.error(error.message)
  // console.log('here')

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else{
    return response.status(500).send({ error: error.message })
  }
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


morgan.token('body', req => JSON.stringify(req.body))
let logger = morgan(':method :url :status :res[content-length] - :response-time ms :body')


app.use(express.static('build'))
app.use(express.json())
app.use(logger)
app.use(cors())

morgan.token('type', function (req) { return req.headers['content-type'] })




app.get('/api/persons', (req, res) => {
  Person.find({}).then(result => {
    res.json(result).status(204).end()
  })
})

app.get('/api/:id', (req, res,next) => {
  const id = req.params.id
  //get by id
  Person.findById(id).then(result => {
    if (result) {
      let person = result.toJSON()
      delete person.date
      res.json(person).status(200).end()
    }
  }).catch(error => (next(error)))

})
app.delete('/api/:id', (req, res, next) => {
  const idToDelete = req.params.id
  Person.findByIdAndDelete(idToDelete).then(() => {
    res.status(204).end()
  }).catch(error => next(error))
})
app.post('/api/persons', (req, res, next) => {
  const incomingData = req.body
  if (!incomingData.name || !incomingData.number) {
    res.status(202)
    res.send('Name or number are missing')
  }
  else {
    const newPerson = new Person({
      name: incomingData.name,
      number: incomingData.number,
      date: new Date(),
    })

    newPerson.save().then(() => {
      console.log('Person saved !')
      res.send(newPerson)
    })
      .catch(error => next(error))
  }
})

app.put('/api/:id', (req, res, next) => {
  const id = req.params.id
  const incomingData = req.body
  const editedPerson = {
    name: incomingData.name,
    number: incomingData.number,
  }
  // return
  Person.findByIdAndUpdate(id, editedPerson).then(() => {
    res.send({ ...editedPerson, id: id }).end()
  }).catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.use(unknownEndpoint)
app.use(errorHandler)
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

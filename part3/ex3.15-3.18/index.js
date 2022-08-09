const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require("cors");
const Person = require('./Models/person')
const mongoose = require('mongoose')
require("dotenv").config()

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
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

morgan.token('type', function (req, res) { return req.headers['content-type'] })




app.get("/api/persons", (req, res, next) => {
  Person.find({}).then(result => {
    res.json(result).status(204).end()
  })
})

app.get("/api/:id", (req, res) => {
  const id = req.params.id
  //get by id
  Person.findById(id).then(result => {
    if (result) {
      let person = result.toJSON()
      delete person.date
      res.json(person).status(200).end()
    }
  }).catch(error =>(next(error)))
  // const person = persons.find(person=>person.id == id)
  // console.log("type of person : ", typeof person)
  // if(!person) res.status(404)
  // res.send(person)
})
app.delete("/api/:id", (req, res, next) => {
  const idToDelete = req.params.id
  Person.findByIdAndDelete(idToDelete).then(result => {
    res.status(204).end()
  }).catch(error => next(error))
})
app.post("/api/persons", (req, res, next) => {
  const range = 10000
  const persons = Person.find({})
  const incomingData = req.body
  if (!incomingData.name || !incomingData.number) {
    res.status(202)
    res.send("Name or number are missing")
  }
  else {
    const newPerson = new Person({
      name: incomingData.name,
      number: incomingData.number,
      date: new Date(),
    })

    newPerson.save().then(result => {
      console.log('Person saved !')
      res.send(newPerson)
    })
      .catch(error => next(error))
  }
})

app.put("/api/:id", (req, res, next) => {
  const id = req.params.id
  const incomingData = req.body
  const editedPerson = {
    name: incomingData.name,
    number: incomingData.number,
  }
  // return
  Person.findByIdAndUpdate(id, editedPerson).then(result => {
    res.send({ ...editedPerson, id: id }).end()
  }).catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.use(unknownEndpoint)
app.use(errorHandler)
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

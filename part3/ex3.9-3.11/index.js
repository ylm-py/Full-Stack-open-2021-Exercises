const http = require('http')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require("cors");
morgan.token('body',req=>JSON.stringify(req.body))

let logger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

app.use(express.json())
app.use(logger)
app.use(express.static('build'))
app.use(cors())
morgan.token('type', function (req, res) { return req.headers['content-type'] })
let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]
//get all persons
app.get("/api/persons",(req,res) =>{
  res.json(persons).status(204).end()
})
//get info at current time
app.get("/api/info",(req,res) =>{
  let text = `<p>Phone book has info for ${persons.length} people.</p>
              <p>${new Date}</p>`
  res.header("Content-Type",'text/html');
  res.send(text)
})
app.get("/api/:id",(req,res)=>{
  const id = req.params.id
  const person = persons.find(person=>person.id == id)
  console.log("type of person : ", typeof person)
  if(!person) res.status(404)
  res.send(person)
  
})
app.delete("/api/:id",(req,res)=>{
  const idToDelete = Number(req.params.id)
  const index = persons.findIndex(person=>person.id === idToDelete)

  if(index == -1){
    res.send('error deletion').status(202)
  }
  else{
    persons.splice(index,1)
    res.send('successfully deleted')
  }
  
})
app.post("/api/persons",(req,res)=>{
  const range = 10000
  const incomingData = req.body
  if(!incomingData.name || !incomingData.number){
    res.status(202)
    res.send("Name or number are missing")
  }
  else{
    if (persons.find(person=>person.name === incomingData.name)) res.status(202).send({ error: 'name must be unique' })

    else{
      const newPerson = {
        "id": Math.floor(Math.random() * range),
        "name":incomingData.name,
        "number":incomingData.number,
      }
      persons.push(newPerson)
      res.send("successfully added")
    }
  }
})
const PORT = process.env.PORT || 3001

app.listen(PORT)
console.log(`Server running on port ${PORT}`)

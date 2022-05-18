import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const updateInput = (element, func) => {
  func(element)
}
const PersonForm = (props) =>{
  const {nameValue,numberValue,setNewName,setNewNumber,setPersons,persons} = props

  const handleNameChange = (event) => {
    updateInput(event.target.value, setNewName)

  }
  const handleNumberChange = (event) => {
    updateInput(event.target.value, setNewNumber)

  }
  const addNewPerson = (event) => {
    event.preventDefault()
    console.log("default behaviour prevented ");

    const isUnique = persons.every(value => value.name !== nameValue)

    if (!isUnique) {
      console.log(persons);
      alert(`${nameValue} is already in the phonebook`)
    }
    else {
      if (numberValue === "") {
        alert("Every contact should have a number")
      }
      else {
        const personToAdd = { name: nameValue, number: numberValue }
        setPersons(persons.concat(personToAdd))
        setNewName('')
        setNewNumber('')
      }
    }
  }
  return(
    <form>
        <div>
          name: <input onChange={handleNameChange} value={nameValue} /><br/>
          number: <input onChange={handleNumberChange} value={numberValue} />
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>
  )
}

const Filter = (props) =>{
  const{className,value,setSearchField} = props
  const handleFilterChange = (event) => {
    updateInput(event.target.value, setSearchField)
  }
  return(
    <div className = {className}>
      filter shown with <input onChange = {handleFilterChange} value = {value}/>
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const isEmpty = searchField === ''
  const filtered = isEmpty ? persons : persons.filter(person => searchField.toUpperCase() === person.name.slice(0, searchField.length).toUpperCase())

  const hook = () =>{
    axios
    .get('http://localhost:3001/persons')
    .then(response =>setPersons(response.data))
  }
  useEffect(hook,[])
  

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value = {searchField} setSearchField = {setSearchField}/>
      <h3>Add a new</h3>
        <PersonForm 
        nameValue = {newName} 
        numberValue = {newNumber} 
        setNewName = {setNewName} 
        setNewNumber = {setNewNumber} 
        setPersons = {setPersons} 
        persons = {persons} />
      <h2>Numbers</h2>
      <Persons filtered = {filtered}/>
    </div>
  )
}
const Persons = (props) =>{
  const filtered = props.filtered
  return(
    <ul>
      {filtered.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}
export default App
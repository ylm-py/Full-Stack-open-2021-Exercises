import React, { useState, useEffect } from 'react'
import PersonForm from './Components/PersonForm';
import Persons from './Components/Persons';
import SearchField from './Components/SearchField';
import phoneBookService from './services/phonebookServices'
import FriendlyError from './Components/FriendlyError';
import './index.css'


const isValidEntry = (name,number) =>{
  if(number.toString().length <10 || isNaN(number)||name.length <2) return false
  else return true
} 

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const [errorMessage,setErrorMessage] = useState('')
  const [lastActionnedPerson,setLastPerson] = useState({})
  const errorMessageDelay = 2500;
  




  useEffect(() => {
    phoneBookService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])
  const filtered = persons.filter(person => person.name.includes(searchField))


  const deletePerson = (event) =>{
    console.log("target event : ",event.target.value)
    let personID = parseInt(event.target.value)
    console.log("person ID : ",personID)
    let answer = window.confirm("Are you sure you want to delete this number ?")
    setLastPerson(persons.find(person=>person.id === personID))
    if (answer){
     phoneBookService
     .remove(personID)
    .then(response => {
      
      setPersons(persons.filter(person=>person.id !== personID))
      setErrorMessage("delete")
      setTimeout(()=>setErrorMessage("null"),errorMessageDelay)

    })
    .catch(err=>{
      setErrorMessage("removed")
      setTimeout(()=>setErrorMessage("null"),errorMessageDelay)
    })
    
    
   


  }
  }
  const updateExistingUserNumber = (person) =>{
        let personID = person.id
        let changeNumber = {...person,number:newNumber}
        phoneBookService
        .update(personID,changeNumber)
        .then(response => {
          setPersons(persons.map(person => person.id !== personID ? person : response))
          setErrorMessage("Update")
          setTimeout(()=>setErrorMessage("null"),errorMessageDelay)
        })
        .catch(err=>{
          setErrorMessage("removedUpdate")
          setTimeout(()=>setErrorMessage("null"),errorMessageDelay)
        }
          )
    }

  const handleNameChange = (event) => {
    setNewName(event.target.value, setNewName)

  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value, setNewNumber)

  }
  const handleSearchChange = (event) => {
    setSearchField(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    
    console.log("default behaviour prevented ");
    const isUniqueName = persons.every(value => value.name !== newName )
    const isUniqueNumber = persons.every(value => value.number !== newNumber)
    if (isUniqueName &&isUniqueNumber && isValidEntry(newName,newNumber) ) {
        let personToAdd = { name: newName, number: newNumber }
        phoneBookService
        .create(personToAdd)
        .then(user => setPersons(persons.concat(user)))
        setNewName('')
        setNewNumber('')
        setErrorMessage("Added")
        setLastPerson(personToAdd)
        setTimeout(()=>setErrorMessage("null"),errorMessageDelay)

    }
    else if(isUniqueNumber && !isUniqueName){
        let person = persons.find(person=>person.name=== newName)
        let confirmation = window.confirm(`${person.name} is already in the phone book, Do you want to replace the previous number with new one?`)
        if(confirmation) updateExistingUserNumber(person)
        setLastPerson(person)
        console.log("last actionned person : ",lastActionnedPerson)
        
        setNewName('')
        setNewNumber('')
    }
    
    }
  

  return (
    <div>
      <h1>Phonebook</h1>
      <FriendlyError
      errorType ={errorMessage}
      person = {lastActionnedPerson}
      />
        <SearchField 
          searchName = {searchField} 
          handleSearch = {handleSearchChange}
        />
      <h2>Add a new</h2>
        <PersonForm 
          newName = {newName}
          newNumber = {newNumber}
          handleNameChange = {handleNameChange}
          handleNumberChange = {handleNumberChange}
          addNewPerson = {addNewPerson}
        />
      <h3>Numbers</h3>
        <Persons 
          filtered = {filtered}
          deleteFunc = {deletePerson}
        />
    </div>
  )
}


export default App
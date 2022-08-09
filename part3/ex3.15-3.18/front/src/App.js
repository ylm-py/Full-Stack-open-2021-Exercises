import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { config } from './Constants';



function App() {
  const baseUrl = config.url
  const [persons, setPersons] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [editId, setEditId] = useState('')

  useEffect(() => {
    axios
      .get(baseUrl + '/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
    , [])
  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }
  const handleAddOrEdit = (event) => {
    event.preventDefault()
    if (!newName || !newNumber) return
    const person = {
      name: newName,
      number: newNumber
    }
    if(isEdit){
      axios.put(baseUrl + '/api/' + editId, person)
      .then(response => {
        setPersons(persons.map(person => person.id === editId ? response.data : person))
        setNewName('')
        setNewNumber('')
        setIsEdit(false)
        setEditId('')
      }).catch(error => {
        console.log(error)
      }
      )
    }
    else{
      axios
        .post(baseUrl + '/api/persons', person)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data)
        })
    }
  }
  const deletePerson = (id) => {
    axios
      .delete(baseUrl + '/api/' + id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  const editPerson = (id) => {
    setIsEdit(true)
    setNewName(persons.find(person => person.id === id).name)
    setNewNumber(persons.find(person => person.id === id).number)
    setEditId(id)
  }


  return (
    <div className='container'>
      <p>Running in {process.env.NODE_ENV}.</p>
      <div className='head'>
        <h1>Phone book</h1>
        <div className='add-new'>
          <label>Name :</label>
          <input type={'text'} onChange={handleNameInput} value={newName} required></input>
          <label>Number :</label>
          <input type={'text'} onChange={handleNumberInput} value={newNumber} required></input>
          <button onClick={handleAddOrEdit} className='btn btn-add'>{isEdit?'Edit':'Add'}</button>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Action</th>
          </tr>
          {persons.map(person =>
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td className='actions'><button onClick={() => {
                deletePerson(person.id)
              }
              }>Delete</button>
                <button className='edit-btn' onClick={() => {
                  editPerson(person.id)
                }
                }>Edit</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

import React from 'react';
import { useEffect, useState } from 'react';
import personService from './services/personService'



function App() {
  const [persons, setPersons] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [editId, setEditId] = useState('')
  const [error,setError] = useState('')

  useEffect(() => {
    personService.getAllPersons()
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
    if (!newName || !newNumber || isEdit) return
    const person = {
      name: newName,
      number: newNumber
    }
    
      personService.addPerson(person)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data.error)
          setError(error.response.data.error)
          setTimeout(() => {
            setError('')
          }
            , 5000)
        })
  }
  const deletePerson = (id) => {
    personService.deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        setIsEdit(false)
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

  const confirmEdit = () => {
    const person = {
      name: newName,
      number: newNumber
    }
    personService.updatePerson(editId, person)
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
  const cancelEdit = () => {
    setIsEdit(false)
    setNewName('')
    setNewNumber('')
    setEditId('')
  }


  return (
    <div className='container'>
      <p>Running in {process.env.NODE_ENV}.</p>
      <div className='head'>
        <h1>Phone book</h1>
        <div className='error'>{error}</div>
        <div className='add-new'>
          <label>Name :</label>
          <input type={'text'} onChange={handleNameInput} value={newName} required></input>
          <label>Number :</label>
          <input type={'text'} onChange={handleNumberInput} value={newNumber} required></input>
          <div className='btns-container'>
            <button onClick={handleAddOrEdit} className='btn btn-add'>Add</button>
            {isEdit ? <button onClick={confirmEdit} className='btn btn-confirm'>Confirm</button> : null}
            {isEdit ? <button onClick= {cancelEdit} className ='btn btn-cancel'>Cancel</button>:null}
          </div>
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

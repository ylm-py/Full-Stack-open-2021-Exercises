import React from 'react'
const Persons = (props) =>{
    const {filtered,deleteFunc} = props
    return(
      <ul>
        {filtered.map(person => 
        <li key={person.name}>{person.name} {person.number}
        <button value = {person.id} onClick={deleteFunc}>Delete</button>
        </li>)}
      </ul>
    )
  }

export default Persons
  
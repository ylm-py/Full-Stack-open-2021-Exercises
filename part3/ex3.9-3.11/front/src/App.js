import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { config } from './Constants';



function App() {
  const baseUrl = config.url
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl + '/api/persons')
      .then(response => {
        setPersons(response.data)
        console.log('baseUrl : ', baseUrl)
      })
  }
    , [])
  return (
    <div className='container'>
    <h1>Phone book</h1>
    {/* <p>Running in {process.env.NODE_ENV}.</p> */}
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
            <td><button onClick={() => {
              console.log('trigger delete')
            }
            }>Delete</button></td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
}

export default App;

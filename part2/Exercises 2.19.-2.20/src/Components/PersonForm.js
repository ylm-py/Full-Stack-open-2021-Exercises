import React from 'react'
const PersonForm = (props) =>{
    const {newName,newNumber,handleNameChange,handleNumberChange,addNewPerson} = props
    return(
      <form>
          <div>
            name: <input onChange={handleNameChange} value={newName} /><br/>
            number: <input onChange={handleNumberChange} value={newNumber} />
          </div>
          <div>
            <button type="submit" onClick={addNewPerson}>add</button>
          </div>
        </form>
    )
  }

export default PersonForm
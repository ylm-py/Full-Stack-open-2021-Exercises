import React from 'react'

const FriendlyError = (props) =>{
    const {errorType,person} = props
    
    switch(errorType.toLowerCase()){
      case "added":
        return <p className='notification successfully-added'>Added {person.name}</p>
      case"delete":
        return <p className='notification delete'>{person.name} has been deleted successfully</p>
      case"update":
      return <p className='notification update'>Number has been updated successfully</p>
      case "removed":
        return <p className='notification user-removed'>Information of {person.name} has already been removed from the server</p>
      case "removedupdate":
        return <p className='notification user-removed'>Information of {person.name} you trying to update has already been removed from the server</p>
      default:
        return null
    }
    
}

export default FriendlyError

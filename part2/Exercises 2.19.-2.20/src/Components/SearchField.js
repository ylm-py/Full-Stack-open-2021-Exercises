import React from "react"
const SearchField = (props) =>{
    const{searchName,handleSearch} = props
    return(
      <div>
        filter shown with <input onChange = {handleSearch} value = {searchName}/>
      </div>
    )
  }

  export default SearchField
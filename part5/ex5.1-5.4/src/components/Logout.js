import React from 'react'
const Logout = ({handleUser}) => {
    const handleLogout = () =>{
        window.localStorage.clear()
        handleUser(null)
    }
    return(
        <>
            <button onClick={handleLogout}>Log out</button>
        </>
    )
}

export default Logout
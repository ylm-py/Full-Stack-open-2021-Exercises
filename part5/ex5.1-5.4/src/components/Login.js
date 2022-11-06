import React, { useState } from 'react'
import loginService from '../services/loginService'

const Login = ( { handleUser , handleFeedbackMessage } ) =>{
    const [username,setUsername] = useState('')
    const [password,setPassword] =useState('')
    
    const handleLogin = async (event) =>{
        event.preventDefault()
        try{
            const res = await loginService.login({username,password})
            setPassword('')
            setUsername('')
            window.localStorage.setItem('LoggedUser',JSON.stringify(res.data))
            handleUser(res.data)
        }
        catch(exc){
            handleFeedbackMessage({type:'error',content :'username or password incorrect'})
            setTimeout(()=>handleFeedbackMessage(null),2000)
            setUsername('')
            setPassword('')
        }
    }
    const handlePassword = (event) =>{
        setPassword(event.target.value)
    }
    const handleUsername = (event) =>{
        setUsername(event.target.value)
    }
    return (
        <>
        <h1>Login to your account :</h1>
        <div style={{width:'200px'}}>
            <form className='login-form' onSubmit={handleLogin}>
                <label>Username :</label>
                <input onChange={handleUsername} value={username} type={'text'}></input>
                <label>Password :</label>
                <input onChange={handlePassword} value={password} type={'password'}></input>
                <button style={{margin:'10px 0'}} type='submit'>Sign in</button>
            </form>
        </div>
        </>
    )
}

export default Login
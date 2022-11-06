import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogServices'
import Login from './components/Login'
import FeedBack from './components/FeedBack'
import Logout from './components/Logout'
import NewBlog from './components/NewBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [feedbackMessage,setFeedbackMessage] = useState(null)

  const addedBlog = (blog) =>{
    setBlogs(blogs.concat(blog))
  }
  const handleFeedbackMessage = message =>{
    setFeedbackMessage(message)
  }
  const handleUser = (user) =>{
    setUser(user)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(()=>{
    const loggedUser = window.localStorage.getItem('LoggedUser')
    if(loggedUser){
      handleUser(JSON.parse(loggedUser))
    }
  },[])

  return (
    <div>
      {feedbackMessage ? <FeedBack message={feedbackMessage}/> : null}
      {user == null ? <Login handleUser={handleUser} handleFeedbackMessage={handleFeedbackMessage}/> : <div><p>Logged in as {user.username}</p></div>}
      {user == null ? null : 
      <>
      <h2>blogs :</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <NewBlog handleFeedbackMessage={handleFeedbackMessage} token={user.token} refreshBlogs={addedBlog} />
      </>
      }
      {user ? <Logout handleUser={handleUser}/> : null}
    </div>
  )
}

export default App

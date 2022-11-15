import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogServices'
import Login from './components/Login'
import FeedBack from './components/FeedBack'
import Logout from './components/Logout'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [feedbackMessage, setFeedbackMessage] = useState(null)
  const blogFormRef = useRef()

  const addedBlog = (blog) => {
    setBlogs(blogs.concat(blog))
  }
  const updateBlogs = (blog,id) => {
    if(id){
      const updatedBlogs = blogs.filter(blog => blog.id !== id)
      setBlogs(updatedBlogs)
    }
    else{
      const updatedBlogs = blogs.map((b) => (b.id === blog.id ? blog : b))
      setBlogs(updatedBlogs)
    }
  }
  const handleFeedbackMessage = message => {
    setFeedbackMessage(message)
  }
  const handleUser = (user) => {
    setUser(user)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>{
      const sortedBlogs = blogs.sort((a,b)=>b.likes-a.likes)
      setBlogs(sortedBlogs)
    }
    )
  }, [])
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('LoggedUser')
    if (loggedUser) {
      handleUser(JSON.parse(loggedUser))
    }
  }, [])

  return (
    <div>
      {feedbackMessage ? <FeedBack message={feedbackMessage} /> : null}
      {user == null ?
        <>
          <h1>Login to your account :</h1>
          <Togglable btnLabel='Login'>
            <Login handleUser={handleUser} handleFeedbackMessage={handleFeedbackMessage} />
          </Togglable>
        </> :
        <div><p>Logged in as {user.username}</p></div>}
      {user == null ? null :
        <>
          <h2>blogs :</h2>
          {blogs.map(blog =>
            <Blog 
            key={blog.id} 
            blog={blog} 
            refreshBlogs={updateBlogs}
            displayMessage={handleFeedbackMessage}
            loggedUser={user} />
          )}
          <Togglable btnLabel="Add new blog" ref={blogFormRef}>
            <NewBlog handleFeedbackMessage={handleFeedbackMessage} token={user.token} refreshBlogs={addedBlog} blogFormRef={blogFormRef} />
          </Togglable>
        </>
      }
      {user ? <Logout handleUser={handleUser} /> : null}
    </div>
  )
}

export default App

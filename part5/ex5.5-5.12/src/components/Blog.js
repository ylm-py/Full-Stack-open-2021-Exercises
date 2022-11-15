import React ,{useState} from 'react'
import './css/App.css'
import blogServices from '../services/blogServices'
const style = {border:'1px solid black',padding:'5px',marginTop:'5px',display:'flex',gap:20}

const Blog = ({blog,refreshBlogs,displayMessage,loggedUser}) => {
  const [visible,setVisible] = useState(false)
  const showWhenVisible = {display: visible ? 'none' : ''}
  const hideWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () =>{
    setVisible(!visible)
  }
  const removeBlog = async () =>{
    if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    try{
      await blogServices.removeBlog(blog.id)
      refreshBlogs(null,blog.id)
      displayMessage({content:`${blog.title} by ${blog.author} has been removed`,type:'success'})
      setTimeout(() => {
        displayMessage(null)
      }, 5000);
    }
    catch(error){
      console.log('error :' ,error)
      displayMessage({content:`${error}`,type:'error'})
      setTimeout(() => {
        displayMessage(null)
      }, 5000);
    }
  }
  const likeBlog = async()=>{
    const updatedBlog = {...blog,likes:blog.likes+1}
    try{
      const res = await blogServices.blogLike(updatedBlog)
      refreshBlogs(res)
    }
    catch(error){
      displayMessage({content:`${error}`,type:'error'})
      setTimeout(() => {
        displayMessage(null)
      }
      , 5000);
    }
  }

  return(
  <div style={style}>
    <div style={showWhenVisible}>
      <p>Title : {blog.title}</p>
    </div>
    <div style={hideWhenVisible}>
      <p>Title : {blog.title}</p>
      <p>Author : {blog.author}</p>
      <div style={{display:'flex',gap:20}}>
        <p>Likes : {blog.likes}</p> <button onClick={likeBlog}>Like</button>
      </div>
      <p>Url : {blog.url}</p>
      {loggedUser.username === blog.user.username && <button onClick={removeBlog}>Remove</button>}
    </div>
    <div style={{display:'flex', ...showWhenVisible}}>
      <button onClick={toggleVisibility} style={{alignSelf:'center'}}>Show more</button>
    </div>
    <div style={{display:'flex',...hideWhenVisible}}>
      <button onClick={toggleVisibility} style={{alignSelf:'center'}}>Show less</button>
    </div>
  </div> ) 
}

export default Blog
import React , {useState}from 'react'
import blogServices from '../services/blogServices'

const NewBlog = ({refreshBlogs , token, handleFeedbackMessage, blogFormRef}) =>{
    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url,setUrl] = useState('')

    const clearInputs = () =>{
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    const addBlog = async(event) =>{
        event.preventDefault()
        const newBlog = {
            title:title,
            author:author,
            url:url
        }

        try{
            const res = await blogServices.addBlog(newBlog,token)
            refreshBlogs(res)
            clearInputs()
            handleFeedbackMessage({type:'success', content:`${newBlog.title} was added succesfully !`})
            setTimeout(()=>{handleFeedbackMessage(null)},3500)
            blogFormRef.current.toggleVisibility()
        }
        catch(exc){
            console.log('error :',exc)
            handleFeedbackMessage({type:'error', content:'Error occured'})
            setTimeout(()=>{handleFeedbackMessage(null)},3500)
            clearInputs()
            
        }
    }
    return (
        <>
            <form style={{'display':'flex','flexDirection':'column','width':'200px'}}>
                <label>title :</label>
                <input type={'text'} onChange ={(event)=>setTitle(event.target.value)} value={title}></input>
                <label>author :</label>
                <input type={'text'} onChange ={(event)=>setAuthor(event.target.value)} value={author}></input>
                <label>url :</label>
                <input type={'text'} onChange ={(event)=>setUrl(event.target.value)} value={url}></input>
                <button style={{'margin':'5px 0 5px'}} onClick={addBlog}>Add blog</button>
            </form>
        </>
    )
}
export default NewBlog
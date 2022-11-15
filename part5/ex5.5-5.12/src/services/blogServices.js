import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async(blog,token)=>{
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const res = await axios.post(baseUrl,blog,config)
  return res.data
}

const blogLike = async(blog,token) =>{
  delete blog.user
  const loggedUser = JSON.parse(window.localStorage.getItem('LoggedUser'))

  const config = {
    headers: { Authorization: `bearer ${loggedUser.token}` }
  }
  console.log('config',config)
  const res = await axios.put(baseUrl+'/'+blog.id,blog,config)
  return res.data
}

const removeBlog = async(id) =>{
  const loggedUser = JSON.parse(window.localStorage.getItem('LoggedUser'))
  const config = {
    headers: { Authorization: `bearer ${loggedUser.token}` }
  }
  const res = await axios.delete(baseUrl+'/'+id,config)
  return res.data
}
export default { getAll , addBlog, blogLike, removeBlog }

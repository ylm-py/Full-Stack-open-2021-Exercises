const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Helper = require('../helper/Helper')
const Blog = require('../models/blog')


const api = supertest(app)

beforeEach(async()=>{
    await Blog.deleteMany({})
    let blog = new Blog(Helper.initialBlogs[0])
    await blog.save()

    let blog1 = new Blog(Helper.initialBlogs[1])
    await blog1.save()
},10000)

describe('Retreiving blogs', () => {
    test('response should be json and code 200',async ()=>{
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('should return a single blog', async()=>{
        const res = await api.get('/api/blogs')
        const blog = res.body[0]
        
        const one = await api.get(`/api/blogs/${blog.id}`)
        expect(one.body.id).toBe(blog.id)



    })
})
describe('POST',()=>{
    test('Blog with no userId and verification token wont be added',async()=>{
        let newBlog = {
            title:"new title",
            author:"martin",
            url:"url"
        }
        const res = await api.post('/api/blogs').send(newBlog).expect(400)
        expect(res.body).toHaveProperty('error')
    })
    test('Valid blog with valid token is added successfully', async()=>{
        const user = {username:'root',password:'sekret'}
        const log = await api.post('/api/login').send(user)
        expect(log.status).toBe(200)
        const token = log.body.token
        let newBlog = {
            title:"Valid blog",
            author:"Valid author",
            url:"Valid url"
        }
        const res = await api.post('/api/blogs').send(newBlog).set('Authorization',`bearer ${token}`)
        expect(res.body).toHaveProperty('id')
        expect(res.status).toBe(201)
    })
})
describe('Deletion',()=>{
    test('a blog is deleted successfully', async ()=>{
        const user = {username:'root',password:'sekret'}
        const log = await api.post('/api/login').send(user)
        expect(log.status).toBe(200)
        const token = log.body.token
        const res = await api.get('/api/blogs')
        const toDelete = res.body[0]
        
        const del = await api.delete(`/api/blogs/${toDelete.id}`).set('Authorization',`bearer ${token}`)
        expect(del.status).toBe(200)
        expect(del.body).toHaveProperty('success')
    
        const after = await api.get('/api/blogs')
        expect(after).not.toContain(toDelete)
    
    })
    test('Missing verification token', async ()=>{
        const res = await api.get('/api/blogs')
        const toDelete = res.body[0]
        const del = await api.delete(`/api/blogs/${toDelete.id}`)
        expect(del.status).toBe(400)
        expect(del.body).toHaveProperty('error')
    })
})
describe('Data validation',()=>{
    test('Blogs should have ids',async()=>{
        const res = await api.get('/api/blogs')
        res.body.forEach(blog=>{
            expect(blog.id).toBeDefined()
        })
    })
    test('likes should have value 0 if missing',async()=>{
        let newBlog = {
            title:"no likes",
            author:"no likes",
            url:"no likes"
        }
        const user = {username:'root',password:'sekret'}
        const log = await api.post('/api/login').send(user)
        expect(log.status).toBe(200)
        const token = log.body.token
        const res = await api.post('/api/blogs').send(newBlog).set('Authorization',`bearer ${token}`)
        expect(res.body.likes).toBe(0)
    })
    test('response should be 400 Bad request (missing title or url)',async()=>{
        let newBlog = {
            author:"author",
            likes:"likes"
        }
        await api.post('/api/blogs').send(newBlog).expect(400)
    
    })
})


afterAll(() => {
    mongoose.connection.close()
  })
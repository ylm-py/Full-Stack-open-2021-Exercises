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
    test('a Valid blog can be added',async()=>{
        let newBlog = {
            title:"new title",
            author:"martin",
            url:"url"
        }
        await api.post('/api/blogs').send(newBlog).expect(201)
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(Helper.initialBlogs.length + 1)
    })
})
describe('Deletion',()=>{
    test('a blog is deleted successfully', async ()=>{
        const res = await api.get('/api/blogs')
        const toDelete = res.body[0]
        
        const del = await api.delete(`/api/blogs/${toDelete.id}`)
        expect(del.text).toBe('deleted')
    
        const after = await api.get('/api/blogs')
        expect(after).not.toContain(toDelete)
    
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
        const res = await api.post('/api/blogs').send(newBlog)
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
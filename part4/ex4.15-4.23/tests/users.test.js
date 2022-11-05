const User = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('../helper/Helper')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    },10000)

describe('New User creation',()=>{
    test('A new user could be added successfully', async ()=>{
        const usersBefore = await api.get('/api/users')
        let newUser = {
            username:'hello',
            name:'mclaren',
            password:'password'
        }
        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type',/application\/json/)

        const usersAfter = await api.get('/api/users')
        expect(usersAfter.body).toHaveLength(usersBefore.body.length + 1)

        const usernames = usersAfter.body.map(u=>u.username)
        expect(usernames).toContain(newUser.username)

    })
    test('response should be error and status code 400 username not unique',async()=>{
        const existingUser = {
            username:'root',
            name:'mclaren',
            password:'password'
        }
        const res = await api.post('/api/users').send(existingUser)
        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty('error')

    })
    test('username and password cant be less than 3 chars', async()=>{
        const incorrectUser = {
            username:"ha",
            password:"12",
            name:"name"
        }
        const res = await api.post('/api/users').send(incorrectUser)
        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty('error')
    })
})
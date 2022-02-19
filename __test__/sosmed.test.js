const request = require('supertest');
const app = require('../app');
const { User } = require('../models');

const userData = {
    email: "test@gmail.com",
    full_name: "Test Account",
    username: "test",
    password: "123",
    profile_image_url: "https://www.google.com",
    age: 21,
    phone_number: "087775764965",
}

const userLogin = {
    email: 'test@gmail.com',
    password: '123'
}

let token;

beforeAll(async () => {
    const clean = await User.sequelize.truncate({cascade: true, restartIdentity: true})
    const regis = await request(app).post('/users/register').send(userData).set('Accept', 'application/json')

    const response = await request(app).post('/users/login').send(userLogin).set('Accept', 'application/json')
    token = response.body.token
})


describe("POST socialmedia", () => {
    test("post socialmedia success", async function () {
        const socialmediaData = {
            name: 'SocialMedia Test',
            social_media_url: 'https://blog.tripcetera.com/id/wp-content/uploads/2020/10/pulau-padar.jpg'
        }
        const response = await request(app).post('/socialmedias/').send(socialmediaData).set('token', token)
            
            expect(response.status).toBe(201)

            expect(typeof response).toBe("object")

            expect(response.body).toHaveProperty('id')

            expect(response.body).toHaveProperty('name')
            expect(response.body.name).toBe(socialmediaData.name)
            
            expect(response.body).toHaveProperty('social_media_url')
            expect(response.body.social_media_url).toBe(socialmediaData.social_media_url)

            expect(response.body).toHaveProperty('users_id')
    })
})

describe("GET socialmedia", () => {
    test("get socialmedia success", async () => {
        
        const response = await request(app).get('/socialmedias').set('token', token)
            
            expect(response.status).toBe(200)

            expect(typeof response).toBe("object")

            expect(response.body[0]).toHaveProperty('id')

            expect(response.body[0]).toHaveProperty('name')
            
            expect(response.body[0]).toHaveProperty('social_media_url')

            expect(response.body[0]).toHaveProperty('users_id')
    });
});

describe("PUT socialmedia", () => {
    test("put socialmedia success", async () => {
        const socialmediaData = {
            name: 'Update SocialMedia Test',
            social_media_url: 'https://update.test.com/id/wp-content/uploads/2020/10/pulau-padar.jpg'
        }

        const response = await request(app).put('/socialmedias/1').send(socialmediaData).set('token', token)

            expect(response.status).toBe(200)

            expect(typeof response).toBe("object")

            expect(response.body).toHaveProperty('id')

            expect(response.body).toHaveProperty('name')
            expect(response.body.name).toBe(socialmediaData.name)
            
            expect(response.body).toHaveProperty('social_media_url')
            expect(response.body.social_media_url).toBe(socialmediaData.social_media_url)

            expect(response.body).toHaveProperty('users_id')
    })
})

describe("DELETE socialmedia", () => {
    test("delete socialmedia success", async () => {
        
        const response = await request(app).delete('/socialmedias/1').set('token', token)

            expect(response.status).toBe(200)

            expect(typeof response).toBe("object")

            expect(response.body).toHaveProperty("message")
            
            expect(response.body.message).toContain('SocialMedia Berhasil di Hapus')
            
            expect(response.body.message).toBe('SocialMedia Berhasil di Hapus')
           
    });
});

afterAll(async () => {
    const clean = await User.sequelize.truncate({cascade: true, restartIdentity: true})
})
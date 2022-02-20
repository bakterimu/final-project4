const request = require('supertest');
const app = require('../app');
const { User } = require('../models');

const userData = {
    email: "test@test.com",
    full_name: "Test Account",
    username: "test",
    password: "123",
    profile_image_url: "https://www.google.com",
    age: 21,
    phone_number: "0877633059167",
}

const userLogin = {
    email: 'test@test.com',
    password: '123'
}

let token;

beforeAll(async () => {
    const clean = await User.sequelize.truncate({cascade: true, restartIdentity: true})
    const regis = await request(app).post('/users/register').send(userData).set('Accept', 'application/json')

    const response = await request(app).post('/users/login').send(userLogin).set('Accept', 'application/json')
    token = response.body.token
})


describe("POST photo", () => {
    test("post photo success", async function () {
        const photoData = {
            poster_image_url: 'https://kdoe.id',
            title: 'Photo Test',
            caption: 'Loasdrem ipsum dolor sit amet, consectetur adipiscing elit. Proin felis dolor, facilisis quis ligula a, efficitur sodales magna. In scelerisque arcu odio, sed lacinia metus pretium sed. Aenean commodo accumsan hendrerit. Morbi vitae varius lorem. Vestibulum tellus dolor, dictum id ultricies lobortis, ultricies et urna. Vestibulum consequat lacinia turpis eget venenatis. Duis lobortis, risus et rhoncus vestibulum, dolor dui lacinia erat, cursus efficitur odio arcu sed odio.',
        }
        const response = await request(app).post('/Photos').send(photoData).set('token', token)
            
            expect(response.status).toBe(201)

            expect(typeof response).toBe("object")

            expect(response.body).toHaveProperty('id')

            expect(response.body).toHaveProperty('title')
            expect(response.body.title).toBe(photoData.title)
            
            expect(response.body).toHaveProperty('caption')
            expect(response.body.caption).toBe(photoData.caption)
            
            expect(response.body).toHaveProperty('poster_image_url')
            expect(response.body.poster_image_url).toBe(photoData.poster_image_url)

            expect(response.body).toHaveProperty('users_id')
    })
})

describe("GET photo", () => {
    test("get photo success", async () => {
        
        const response = await request(app).get('/Photos').set('token', token)
            
            expect(response.status).toBe(200)

            expect(typeof response).toBe("object")

            expect(response.body[0]).toHaveProperty('id')

            expect(response.body[0]).toHaveProperty('title')
            
            expect(response.body[0]).toHaveProperty('caption');
            
            expect(response.body[0]).toHaveProperty('poster_image_url')

            expect(response.body[0]).toHaveProperty('users_id')
    });
});

describe("PUT photo", () => {
    test("put photo success", async () => {
        const photoData = {
            poster_image_url: 'https://kdoe.id',
            title: 'Update Photo Test',
            caption: 'Lorem ipsum dolor sit amet'
        }

        const response = await request(app).put('/Photos/1').send(photoData).set('token', token)

            expect(response.status).toBe(200)

            expect(typeof response).toBe("object")

            expect(response.body).toHaveProperty('id')

            expect(response.body).toHaveProperty('title')
            expect(response.body.title).toBe(photoData.title)
            
            expect(response.body).toHaveProperty('caption')
            expect(response.body.caption).toBe(photoData.caption)
            
            expect(response.body).toHaveProperty('poster_image_url')
            expect(response.body.poster_image_url).toBe(photoData.poster_image_url)

            expect(response.body).toHaveProperty('users_id')
    })
})

describe("DELETE photo", () => {
    test("delete photo success", async () => {
        
        const response = await request(app).delete('/photos/1').set('token', token)

            expect(response.status).toBe(200)

            expect(typeof response).toBe("object")

            expect(response.body).toHaveProperty("message")
            
            expect(response.body.message).toContain('Data berhasil dihapus')
            
            expect(response.body.message).toBe('Data berhasil dihapus')
           
    });
});

afterAll(async () => {
    const clean = await User.sequelize.truncate({cascade: true, restartIdentity: true})
})
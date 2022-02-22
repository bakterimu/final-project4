const request = require('supertest');
const app = require('../app');
const { User } = require("../models");
let token;

describe('POST /users/register Route', () => {
  beforeAll(async () => {
    await User.sequelize.sync({force: true})
  })
  test('POST /users/register mengembalikan output data user yang telah diinput dan status code 201', async () => {
    const response = await request(app)
    .post('/users/register')
    .send({email: "dimas@gmail.com", full_name:"izhar", password:"izhar123", profile_image_url:"kode.id", age: 17, phone_number:"0895365278281", username:"izhar34"})
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('full_name')
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('profile_image_url')
    expect(response.body).toHaveProperty('age')
    expect(response.body).toHaveProperty('phone_number')
    expect(response.body).toHaveProperty('password')
    expect(response.body).toHaveProperty('updatedAt')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body.email).toBe('dimas@gmail.com')
    expect(response.body.username).toBe('izhar34')
  });

  test('POST /users/register mengembalikan error ketika salah satu data tidak diisi', async () => {
    const response = await request(app)
    .post('/users/register')
    // Mengosongkan Username
    .send({email: "dimas1@gmail.com", full_name:"izhar", password:"izhar123", profile_image_url:"kode.id", age: 17, phone_number:"0895365278281", username: null})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('errors')
    expect(response.body.name).toBe('SequelizeValidationError')
    expect(response.body.errors[0].message).toBe('User.username cannot be null')
  })
});

// Testing POST Login User
describe('POST /users/login Route', () => {
  test('POST /users/login mengembalikan token dan status code 200 jika berhasil login', async () => {
    const admin = await request(app)
    .post('/users/register')
    .send({email: "admin@gmail.com", full_name:"admin", password:"admin123", profile_image_url:"kode.id", age: 17, phone_number:"0895365278281", username: "admin"})
    const response = await request(app)
    .post('/users/login')
    .send({email: "admin@gmail.com", password: "admin123"})
    token = response.body.token
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body.token).toBeDefined()
    expect(typeof response.body.token).toBe('string')
    expect(typeof response.body).toBe('object')
    expect(response.body.token).toMatch(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoyLCJpYXQiOjE2N/)
  });

  test('POST /users/login tidak mengeluarkan token jika input salah dan status code 401', async () => {
    const response = await request(app)
    .post('/users/login')
    .send({email: "salah@gmail.com", password: "salah123"})
    expect(response.status).toBe(401)
    expect(response.body).not.toHaveProperty('token')
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('errors')
    expect(response.body.message).toBe('Error')
    expect(response.body.errors).toBe('User Not Found.')
  });
});

describe('PUT /users/1 mengembalikan output data user yang sudah diubah', () => {
  test('PUT /users/1 mengedit user dengan id 1', async () => {
    const response = await request(app)
    .put('/users/1')
    .send({email: "dimas123@gmail.com", full_name:"bayu", password:"dimas123", age: 17})
    .set('token', token)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('password')
    expect(response.body).toHaveProperty('age')
    expect(response.body.email).toBe('dimas123@gmail.com')
  })
})



describe('PUT /users/3 mengembalikan output salah ketika user tidak ditemukan', () => {
  test('PUT /users/3', async () => {
    const response = await request(app)
    .put('/users/3')
    .send({email: "dimas@gmail.com", full_name:"bayu", password:"izhar123", age: 17})
    .set('token', token)
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('msg', 'User tidak ditemukan!')
  })
})

describe('DELETE /users/1 menghapus data user dan mengembalikan msg berhasil dihapus', () => {
  test('DELETE /users/1', async () => {
    const response = await request(app)
    .delete('/users/1')
    .set('token', token)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('msg')
    expect(response.body.msg).toBe('User berhasil dihapus!')
    
    const response2 = await request(app)
    .delete('/users/1')
    .set('token', token)
    expect(response2.body).toHaveProperty('msg')
    expect(response2.body.msg).toBe('User tidak ditemukan')
  })
})

describe('DELETE /users/1 gagal menghapus karena tidak menemukan data user', () => {
  test('DELETE /users/1 gagal', async () => {
    const response = await request(app)
    .delete('/users/1')
    .set('token', token)
    expect(response.body).toHaveProperty('msg')
    expect(response.body.msg).toBe('User tidak ditemukan')
  })
})

afterAll(async () => {
  await User.sequelize.close()
})
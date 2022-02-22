const request = require('supertest');
const app = require('../app');
const { User, Photo, Comment } = require("../models");
const jwt = require('jsonwebtoken')
let token;
let token2 = jwt.sign({
	email: 'bukan@gmail.com', id : 5
	}, 'rahasia')
let input_user = {
    email: "test@gmail.com",
    full_name: "nama",
    username: "username",
    password: "pass123",
    profile_image_url: "kode.id",
    age: 18,
    phone_number: "0895365278282"}

let input_photo = {
    title: "title",
    poster_image_url: "kode.id",
    caption: "caption",
    users_id: 1}
  
let userLogin = {
  email: 'test@gmail.com',
  password: 'pass123'
}

beforeAll(async () => {
  await User.sequelize.sync({force: true})
  await Comment.sequelize.sync({force: true})
  await Photo.sequelize.sync({force: true})
  await request(app).post('/users/register').send(input_user).set('Accept', 'application/json')
  const response = await request(app).post('/users/login').send(userLogin).set('Accept', 'application/json')
  token = response.body.token;
  await request(app).post('/Photos').send(input_photo).set('Accept', 'application/json').set('token', token)
})


describe('POST /comments Route', () => {
    test('POST /comments mengembalikan output data comment yang telah diinput dan status code 201', async () => {
        const response = await request(app)
        .post('/comments')
        .set('token', token)
        .send({comment: "test", photo_id: 1})
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('comment')
        expect(response.body).toHaveProperty('photo_id')
        expect(response.body.id).toBe(1)
        expect(response.body.comment).toBe('test')
        expect(response.body.id).toBe(1)
    })

		test('POST /comments mengembalikan output error karena input photo_id tidak ditemukan', async () => {
			const response = await request(app)
			.post('/comments')
			.set('token', token)
			.send({comment: "test", photo_id: 2})
			expect(response.status).toBe(500)
			expect(response.body.name).toBe('SequelizeForeignKeyConstraintError')
			expect(response.body.parent.detail).toBe('Key (photo_id)=(2) is not present in table "Photos".')
		})
})

describe('GET /comment Route', () => {
	beforeAll(async () => {
		const res = await request(app)
        .post('/comments')
        .set('token', token)
        .send({comment: "test2", photo_id: 1})
	})
	test('GET /comment mengembalikan output semua data comment pada semua foto', async () => {
		const response = await request(app)
		.get('/comments')
		.set('token', token)
		expect(response.status).toBe(200)
		expect(typeof response.body).toBe('object')
		expect(response.body.length).toBe(2)
		expect(response.body[1].id).toBe(1)
		expect(response.body[0].users_id).toBe(1)
		expect(response.body[0].comment).toBe('test2')
		expect(response.body[1].comment).toBe('test')
	})

	test('GET /comment mengembalikan output error ketika bukan user yang mengakses', async () => {
		const response = await request(app)
		.get('/comments')
		.set('token', token2)
		expect(response.status).toBe(401)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('errors')
		expect(response.body.message).toBe('Error')
		expect(response.body.errors).toBe('User Not Found.')
	})
})

describe('PUT /comments Route', () => {
	let editComment = {
		comment: "edit",
		photo_id: 1
	}
	test('PUT /comments akan menghasilkan data comment yang telah diedit', async () => {
		const response = await request(app)
		.put('/comments/1')
		.set('token', token)
		.send(editComment)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('comment')
		expect(response.body).toHaveProperty('photo_id')
		expect(response.body.comment).toBe('edit')
		expect(response.body.photo_id).toBe(1)
	})

	test('PUT /comments akan menghasilkan error ketika comment tidak ditemukan', async () => {
		const response = await request(app)
		.put('/comments/2')
		.set('token', token)
		.send(editComment)
		expect(response.status).toBe(404)
		expect(response.body).toHaveProperty('msg')
		expect(response.body.msg).toBe('Comment tidak ditemukan')
	})
})

describe('DELETE /comments Route', () => {
	test('DELETE /comments akan menghapus data comment dan mengeluarkan msg data telah dihapus', async () => {
		const response = await request(app)
		.delete('/comments/1')
		.set('token', token)
		const res = await request(app)
		.get('/comments')
		.set('token', token)
		expect(response.status).toBe(200)
		expect(typeof response.body).toBe('object')
		expect(response.body).toHaveProperty('msg')
		expect(response.body.msg).toBe('Data berhasil dihapus')
		expect(res.body[1]).toBeUndefined()
	})

	test('DELETE /comments akan menghasilkan error ketika comment tidak ditemukan', async () => {
		const response = await request(app)
		.put('/comments/1')
		.set('token', token)
		expect(response.status).toBe(404)
		expect(response.body).toHaveProperty('msg')
		expect(response.body.msg).toBe('Comment tidak ditemukan')
	})
})



afterAll(async () => {
    await User.sequelize.close()
    await Photo.sequelize.close()
    await Comment.sequelize.close()
  })
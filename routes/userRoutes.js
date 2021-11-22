const userController = require('./../controllers/userControllers.js');
const route = require('express').Router();

route.post('/users/register', userController.createUser);
route.post('/users/login', userController.loginUser);
route.put('/users/:userId', userController.editUser);
route.delete('/users/:userId', userController.deleteUser);

module.exports = route;
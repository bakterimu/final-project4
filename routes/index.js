const potoController = require('../controllers/PotoControllers');
const commentController = require('../controllers/commentController.js');
const userController = require('../controllers/userControllers.js');
const SocialMediaController = require('../controllers/SocialMediaControllers');
const midleware = require('../midleware/authtoken')


module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'hacktiv8.com',
    }));

    app.post('/users/register', userController.createUser);
    app.post('/users/login', userController.signin);
    // app.put('/cek/:id', userController.retrieve);
    app.put('/users/:userId',midleware.authenticateToken, userController.editUser);
    app.delete('/users/:userId',midleware.authenticateToken, userController.deleteUser);

    app.get('/Photos',midleware.authenticateToken, potoController.list);
    app.post('/Photos',midleware.authenticateToken,potoController.create);
    app.get('/Photos/:id',midleware.authenticateToken, potoController.retrieve);
    app.put('/Photos/:id',midleware.authenticateToken, potoController.update);
    app.delete('/Photos/:id',midleware.authenticateToken, potoController.destroy);



    app.get('/Sosmed', SocialMediaController.list);
    app.post('/Sosmed', SocialMediaController.create);
    app.get('/Sosmed/:id', SocialMediaController.retrieve);
    app.put('/Sosmed/:id', SocialMediaController.update);
    app.delete('/Sosmed/:id', SocialMediaController.destroy);


    app.post('/comments', commentController.createComment);
    app.get('/comments', commentController.getComment);
    app.put('/comments/:comment_id', commentController.editComment);
    app.delete('/comments/:comment_id', commentController.deleteComment);


};
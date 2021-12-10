const potoController = require('../controllers/PotoControllers');
const commentController = require('../controllers/commentController.js');
const userController = require('../controllers/userControllers.js');
const SocialMediaController = require('../controllers/SocialMediaControllers');


module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'hacktiv8.com',
    }));

    app.post('/users/register', userController.createUser);
    app.post('/users/login', userController.loginUser);
    app.put('/cek/:id', userController.retrieve);
    app.put('/users/:userId', userController.editUser);
    app.delete('/users/:userId', userController.deleteUser);

    app.get('/Photos', potoController.list);
    app.post('/Photos', potoController.create);
    app.get('/Photos/:id', potoController.retrieve);
    app.put('/Photos/:id', potoController.update);
    app.delete('/Photos/:id', potoController.destroy);



    app.get('/Sosmed', SocialMediaController.list);
    app.post('/Sosmed', SocialMediaController.create);
    app.get('/Sosmed/:id', SocialMediaController.retrieve);
    app.put('/Sosmed/:id', SocialMediaController.update);
    app.delete('/Sosmed/:id', SocialMediaController.destroy);


    app.post('/comments', commentController.createComment);
    app.get('/comments', commentController.getComment);
    // app.put('/comments/:comment_id', commentController.editcomment);
    app.delete('/comments/:comment_id', commentController.deleteComment);


};
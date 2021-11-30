const potoController = require('../controllers/PotoControllers');
const SocialMediaController = require('../controllers/SocialMediaController');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'hacktiv8.com',
    }));

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

};
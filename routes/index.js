const potoController = require('../controllers/PotoControllers');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'hacktiv8.com',
    }));

    app.get('/Photos', potoController.list);
    app.post('/Photos', potoController.create);
    app.get('/Photos/:id', potoController.retrieve);
    app.put('/Photos/:id', potoController.update);
    app.delete('/Photos/:id', potoController.destroy);

};
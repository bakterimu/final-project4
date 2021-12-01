const commentController = require('./../controllers/commentControllers.js');
const route = require('express').Router();

route.post('/comments', commentController.createComment);
route.get('/comments', commentController.getComment);
route.put('/comments/:comment_id', commentController.editcomment);
route.delete('/comments/:comment_id', commentController.deleteComment);

module.exports = route;
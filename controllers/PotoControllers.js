const Photo = require('../models').Photo;
const User = require('../models').User;
const Comment = require('../models').Comment;
const jwt = require("jsonwebtoken");
const env = require('dotenv').config();

module.exports = {
    list(req, res) {
     
        return Photo.findAll({
                include: [{
                        model: User,
                        attributes: ['id', 'username', 'profile_image_url']
                    },
                    {
                        include: {
                            model: User,
                            attributes: ['username'],
                        },
                        model: Comment,
                        attributes: ['comment'],

                    }
                ],

                required: true,

            })
            .then(photo => res.status(200).send(photo))
            .catch(error => res.status(400).send(error));
    },
    create(req, res) {
        const errObj = {};
        const token = req.headers['token']
        let decoded = jwt.verify(token, process.env.SECRET);
        return Photo
            .create({
                title: req.body.title,
                poster_image_url: req.body.poster_image_url,
                caption: req.body.caption,
                users_id: decoded.id
            })
            .then(photo => res.status(201).send(photo)).catch(err => {
                const errors = err.errors
                const errorList = errors.map(e => {
                    let obj = {}
                    obj[e.path] = e.message
                    return obj;
                })
                return res.status(400).json({
                    success: false,
                    msg: errorList
                })
            })

    },

    retrieve(req, res) {
        return Photo
            .findOne({
                where: { id: req.params.id },
                include: [{
                        model: User,
                        attributes: ['id', 'username', 'profile_image_url']
                    },
                    {
                        include: {
                            model: User,
                            attributes: ['username'],
                        },
                        model: Comment,
                        attributes: ['comment'],

                    }
                ],
            })
            .then(photo => {
                if (!photo) {
                    return res.status(404).send({
                        message: 'photo Not Found',
                    });
                }
                return res.status(200).send(photo);
            })
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return Photo
            .findOne({
                where: { id: req.params.id }
            })
            .then(photo => {
                if (!photo) {
                    return res.status(404).send({
                        message: 'photo Not Found',
                    });
                }
                return photo
                    .update({
                        title: req.body.title,
                        poster_image_url: req.body.poster_image_url,
                        caption: req.body.caption,
                    })
                    .then(() => res.status(200).send(photo)) // Send back the updated photo.
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },


    destroy(req, res) {
        return Photo
            .findOne({
                where: { id: req.params.id }
            })
            .then(photo => {
                if (!photo) {
                    return res.status(400).send({
                        message: 'photo Not Found',
                    });
                }
                return photo
                    .destroy()
                    .then(() => {
                          res.status(200).json({message: "Data berhasil dihapus"});
                      })
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
const SocialMedia = require('../models').SocialMedia;
const User = require('../models').User;
const jwt = require("jsonwebtoken");
const env = require('dotenv').config();

module.exports = {
    list(req, res) {
        return SocialMedia.findAll({
                include: [{
                        model: User,
                        attributes: ['id', 'username', 'profile_image_url'],
                    },
                    
                ],

                required: true,

            })
            .then(SocialMedia => res.status(200).send(SocialMedia))
            .catch(error => res.status(400).send(error));
    },
    create(req, res) {
        const errObj = {};
        const token = req.headers['token']
        let decoded = jwt.verify(token, process.env.SECRET);
        return SocialMedia
            .create({
                name: req.body.name,
                social_media_url: req.body.social_media_url,
                users_id: decoded.id
            })
            .then(SocialMedia => res.status(201).send(SocialMedia)).catch(err => {
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
        return SocialMedia
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

                    }
                ],
            })
            .then(SocialMedia => {
                if (!SocialMedia) {
                    return res.status(404).send({
                        message: 'SocialMedia Not Found',
                    });
                }
                return res.status(200).send(SocialMedia);
            })
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return SocialMedia
            .findOne({
                where: { id: req.params.id }
            })
            .then(SocialMedia => {
                if (!SocialMedia) {
                    return res.status(404).send({
                        message: 'SocialMedia Not Found',
                    });
                }
                return SocialMedia
                    .update({
                        name: req.body.name,
                        social_media_url: req.body.social_media_url,
                    })
                    .then(() => res.status(200).send(SocialMedia)) // Send back the updated SocialMedia.
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },


    destroy(req, res) {
        return SocialMedia
            .findOne({
                where: { id: req.params.id }
            })
            .then(SocialMedia => {
                if (!SocialMedia) {
                    return res.status(400).send({
                        message: 'SocialMedia Not Found',
                    });
                }
                return SocialMedia
                    .destroy()
                    .then(() => res.status(200).send({ message: 'SocialMedia Berhasil di Hapus',}))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
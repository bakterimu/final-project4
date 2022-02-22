const jwt = require("jsonwebtoken");
const { User } = require('../models')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['token']
    if (authHeader == null) return res.status(401).send({
        message: 'Unauthorizet',
        status: false
    })

    if (authHeader) {
        User.findOne({
            where: {
                email: jwt.verify(authHeader, 'rahasia').email,
                id: jwt.verify(authHeader, 'rahasia').id
            }
        })
        .then(data => {
            if (!data) {
                return res.status(401).send({
                    auth: false,
                    email: req.body.email,
                    accessToken: null,
                    message: "Error",
                    errors: "User Not Found."
                });
            } else {
                next()
            }
        })
        .catch(err => {
            res.json(err)
        })
    }}
    module.exports = {authenticateToken}
    
    
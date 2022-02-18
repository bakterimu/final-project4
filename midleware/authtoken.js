const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['token']
    if (authHeader == null) return res.status(401).send({
        message: 'Unauthorizet',
        status: false
    })

    jwt.verify(authHeader, 'rahasia', (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403).send({
            message: 'Forbidden',
            status: false
        })

        req.user = user

        next()
    })
}

module.exports = {
    authenticateToken
}



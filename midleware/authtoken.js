const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['token']
    console.log(authHeader)
    if (authHeader == null) return res.status(401).send({
        message: 'unAuthorization !',
        status: false
    })

    jwt.verify(authHeader, 'rahasia', (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

module.exports = {
    authenticateToken
}



const jwt = require('jsonwebtoken');
const config = require('../config');

const isAuth = (req, res, next) => {

    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(400).json({ msg: 'Invalid token. Authorization denied.' })
    }

    jwt.verify(token, config.SECRET, (err, decoded) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }

        req.user = decoded;
        next();
    })
}

module.exports = isAuth;
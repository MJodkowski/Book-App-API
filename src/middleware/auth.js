const jwt = require('jsonwebtoken'),
User = require('../models/user'),
{ jwtKey } = require('../../config/config');

module.exports = async (req, res, next) => {
    const token = req.cookies.authToken;
    try {
        if (!jwt.verify(token, jwtKey)) {
            throw new Error();
        }
        const decodedToken = jwt.decode(token);
        req.user = await User.findOne({ _id: decodedToken._id, 'tokens.token': token });
        if (!req.user) {
            throw new Error();
        }
        req.token = token;
        next();
    } catch (err) {
        res.status(401).send({error: 'Please authenticate'});
    }
}
const express = require('express'),
User = require('../models/user');

const loginUser = async (req, res) => {
    try {
        const user = await User.findAndVerify(req.body.name, req.body.password);
        const token = await user.generateToken();
        res.cookie('authToken', token, { httpOnly: true });
        res.send({user, token});
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
};

const loginUserRoute = express.Router();
loginUserRoute.post("/loginUser", loginUser);

module.exports = loginUserRoute;

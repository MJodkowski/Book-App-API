const express = require('express'),
router = new express.Router(),
User = require('../models/user'),
auth = require('../middleware/auth');

router.post('/login', async (req, res) => {
    try {
        const user = await User.findAndVerify(req.body.name, req.body.password);
        const token = await user.generateToken();
        res.send({user, token});
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post('/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post('/register', async (req, res) => {
    try {
        if (await User.findOne({ name: req.body.name })) {
            res.send('User already exists!');
        }
        user = new User(req.body);
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;
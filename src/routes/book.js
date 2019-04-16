const express = require('express'),
router = new express.Router(),
Book = require('../models/book'),
auth = require('../middleware/auth');

router.get('/search', auth, async (req, res) => {
    try {
        res.send(await Book.find({[req.query.field]: new RegExp(req.query.query, 'i')}));
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;
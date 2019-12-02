const express = require('express'),
    router = new express.Router(),
    Book = require('../models/book'),
    auth = require('../middleware/auth');

router.get('/search', auth, async (req, res) => {
    try {
        res.send(await Book.find({ [req.query.field]: new RegExp(req.query.query, 'i') }));
    } catch (err) {
        res.status(500).send();
    }
});

router.post('/:title/review', auth, async (req, res) => {
    try {
        const book = await Book.findOne({ title: req.body.title });
        book.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            contents: req.body.contents
        })
        await book.save();
        res.send(book);
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
})

router.get('/reviews', auth, async (req, res) => {
    try {
        console.log(req.body);
        const book = await Book.findOne({ title: req.query.title });
        res.send(book.reviews);
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
})

router.patch('/:id/review/:reviewId', auth, async (req, res) => {
    try {
        const book = await Book.findOne({ title: req.body.title });
        book.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            contents: req.body.contents
        })
        await book.save();
        res.send(book);
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
})

module.exports = router;
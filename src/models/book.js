const mongoose = require('mongoose');

const Book = mongoose.model('Book', {
    isbn: {
        type: String
    },
    title: {
        type: String
    },
    author: {
        type: String
    },
    year: {
        type: Number
    }
});

module.exports = Book;
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
    },
    reviews: [{
            author: {
                type: String
            },
            rating: {
                type: Number
            },
            contents: {
                type: String
            }
        }]
});

module.exports = Book;
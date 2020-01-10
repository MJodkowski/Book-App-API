import mongoose from 'mongoose';

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

export default Book;
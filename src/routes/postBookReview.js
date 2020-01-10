import express from 'express';
import Book from '../models/book';
import auth from '../middleware/auth';

const postBookReview = async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.body.title });
    book.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      contents: req.body.contents,
    });
    await book.save();
    res.send(book);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const postBookReviewRoute = express.Router();
postBookReviewRoute.post('/postBookReview', auth, postBookReview);

export default postBookReviewRoute;

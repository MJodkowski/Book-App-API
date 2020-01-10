const express = require("express"),
  Book = require("../models/book"),
  auth = require("../middleware/auth");

const patchBookReview = async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.body.title });
    const review = book.reviews.find(review => review.id === req.body.reviewId);
    review.rating = req.body.rating;
    review.contents = req.body.contents;
    await book.save();
    res.send(book);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const patchBookReviewRoute = express.Router();
patchBookReviewRoute.patch("/patchBookReview", auth, patchBookReview);

module.exports = patchBookReviewRoute;
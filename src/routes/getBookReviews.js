const express = require("express"),
  Book = require("../models/book"),
  auth = require("../middleware/auth");

const getBookReviews = async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.query.title });
    res.send(book.reviews);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const getBookReviewsRoute = express.Router();
getBookReviewsRoute.get("/getBookReviews", auth, getBookReviews);

module.exports = getBookReviewsRoute;

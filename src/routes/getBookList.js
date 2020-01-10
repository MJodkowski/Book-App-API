const express = require("express"),
  Book = require("../models/book"),
  auth = require("../middleware/auth");

const getBookList = async (req, res) => {
  try {
    res.send(
      await Book.find({ [req.query.field]: new RegExp(req.query.query, "i") })
    );
  } catch (err) {
    res.status(500).send();
  }
};

const getBookListRoute = express.Router();
getBookListRoute.get("/getBookList", auth, getBookList);

module.exports = getBookListRoute;

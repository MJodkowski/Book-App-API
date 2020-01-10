import express from 'express';
import auth from '../middleware/auth';
import Book from '../models/book';

const getBookList = async (req, res) => {
  try {
    res.send(
      await Book.find({ [req.query.field]: new RegExp(req.query.query, 'i') })
    );
  } catch (err) {
    res.status(500).send();
  }
};

const getBookListRoute = express.Router();
getBookListRoute.get('/getBookList', auth, getBookList);

export default getBookListRoute;

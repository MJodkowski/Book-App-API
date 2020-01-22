import express from 'express';
import auth from '../middleware/auth';
import Book from '../models/book';

const getBookList = async (req, res) => {
  const { field, query, currentPage, perPage } = req.query;
  try {
    res.send(
      await Book.aggregate([
        { '$facet': {
          'data': [
            { '$match': { [field]: new RegExp(query, 'i') }},
            { '$sort': { [field]: 1 } },
            { '$skip': (parseInt(currentPage) - 1) * perPage },
            { '$limit': parseInt(perPage) },
          ],
          'totalCount': [
            { '$match': { [field]: new RegExp(query, 'i') }},
            { '$count': 'count' },
          ]
        }}
      ])
    );
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getBookListRoute = express.Router();
getBookListRoute.get('/getBookList', auth, getBookList);

export default getBookListRoute;

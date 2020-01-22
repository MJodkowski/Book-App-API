import express from 'express';
import auth from '../middleware/auth';
import Book from '../models/book';

const getAuthorList = async (req, res) => {
  const { query, currentPage, perPage } = req.query;
  const authors = await Book.aggregate([
    {
      $facet: {
        data: [
          { $match: { author: new RegExp(query, 'i') } },
          {
            $group: {
              _id: '$author',
              books: {
                $addToSet: '$$ROOT',
              },
            },
          },
          { $sort: { _id: 1 } },
          { $skip: (parseInt(currentPage) - 1) * perPage },
          { $limit: parseInt(perPage) },
        ],
        totalCount: [
          { $match: { author: new RegExp(query, 'i') } },
          { $count: 'count' },
        ],
      },
    },
  ]);
  try {
    res.send(authors[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getAuthorListRoute = express.Router();
getAuthorListRoute.get('/getAuthorList', auth, getAuthorList);

export default getAuthorListRoute;

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
              _id: {
                author: '$author',
              },
            },
          },
          { $sort: { _id: 1 } },
          { $skip: (parseInt(currentPage) - 1) * 10 },
          { $limit: parseInt(perPage) },
        ],
        totalCount: [
          { $match: { author: new RegExp(query, 'i') } },
          { $count: 'count' },
        ],
      },
    },
  ]);
  const authorList = [...authors[0].data ];
  const authorBookList = await Promise.all(authorList.map(async authr => {
    const { _id: { author } } = authr;
    return {
      name: author,
      books: await Book.find({ 'author': author })
    }
  }));
  try {
    res.send({
    data: [...authorBookList],
    totalCount: authors[0].totalCount[0].count });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getAuthorListRoute = express.Router();
getAuthorListRoute.get('/getAuthorList', auth, getAuthorList);

export default getAuthorListRoute;

const express = require('express'),
 auth = require('../middleware/auth');

const authenticateUser = async (req, res) => {
  try {
      res.send({ user: req.user });
  } catch (err) {
      console.error(err)
      res.status(500).send(err);
  }
};

const authenticateUserRoute = express.Router();
authenticateUserRoute.post('/authenticateUser', auth, authenticateUser);

module.exports = authenticateUserRoute;
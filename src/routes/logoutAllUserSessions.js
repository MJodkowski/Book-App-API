import express from 'express';
import auth from '../middleware/auth';

const logoutAllUserSessions = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
};

const logoutAllUserSessionsRoute = express.Router();
logoutAllUserSessionsRoute.post(
  '/logoutAllUserSessions',
  auth,
  logoutAllUserSessions
);

export default logoutAllUserSessionsRoute;

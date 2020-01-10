import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { CORS_WHITELIST } from './utils/constants';
import getBookListRoute from './routes/getBookList';
import postBookReview from './routes/postBookReview';
import getBookReviews from './routes/getBookReviews';
import patchBookReview from './routes/patchBookReview';
import loginUser from './routes/loginUser';
import logOutCurrentUserSession from './routes/logoutCurrentUserSession';
import registerUser from './routes/registerUser';
import authenticateUser from './routes/authenticateUser';
import logoutAllUserSessions from './routes/logoutAllUserSessions';

class Server {
  constructor() {
    this.app = express();
    require('./db/mongoose');
    this.app.use(cors(this.corsOptions));
    this.app.use(express.urlencoded());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.registerRoutes();
  }

  start() {
    const port = process.env.PORT || 3001;
    this.app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }

  corsOptions = {
    origin: (origin, callback) => {
      if (CORS_WHITELIST.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'PATCH'],
  };

  registerRoutes() {
    this.app.use(getBookListRoute);
    this.app.use(postBookReview);
    this.app.use(getBookReviews);
    this.app.use(patchBookReview);
    this.app.use(logOutCurrentUserSession);
    this.app.use(logoutAllUserSessions);
    this.app.use(loginUser);
    this.app.use(registerUser);
    this.app.use(authenticateUser);
  }
}

module.exports = Server;

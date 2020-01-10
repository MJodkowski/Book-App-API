const express = require("express"),
  cookieParser = require("cookie-parser"),
  cors = require("cors"),
  { CORS_WHITELIST } = require("./utils/constants"),
  getBookListRoute = require("./routes/getBookList"),
  postBookReview = require("./routes/postBookReview"),
  getBookReviews = require("./routes/getBookReviews"),
  patchBookReview = require("./routes/patchBookReview"),
  loginUser = require("./routes/loginUser"),
  logOutCurrentUserSession = require("./routes/logoutCurrentUserSession"),
  registerUser = require("./routes/registerUser"),
  authenticateUser = require("./routes/authenticateUser"),
  logoutAllUserSessions = require("./routes/logoutAllUserSessions");

class Server {
  constructor() {
    this.app = express();
    require("./db/mongoose");
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
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "PUT", "POST", "PATCH"]
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

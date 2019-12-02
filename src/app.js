const express = require('express'),
cookieParser = require('cookie-parser'),
userRoute = require('./routes/user'),
bookRoute = require('./routes/book'),
cors = require('cors'),
constants = require('./utils/constants');

const corsOptions = {
  origin: (origin, callback)  => {
    if (constants.CORS_WHITELIST.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'PUT', 'POST'],
};

app = express();
PORT = process.env.PORT || 3001;
require('./db/mongoose');

app.use(cors(corsOptions));
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use('/user/', userRoute);
app.use('/book/', bookRoute);

app.listen(PORT, () => console.log(`express listening on port ${PORT}`));
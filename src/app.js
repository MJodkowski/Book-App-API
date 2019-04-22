const express = require('express'),
cookieParser = require('cookie-parser'),
userRoute = require('./routes/user'),
bookRoute = require('./routes/book'),

app = express(),
PORT = process.env.PORT || 3001;
require('./db/mongoose');

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use('/user/', userRoute);
app.use('/book/', bookRoute);

app.listen(PORT, () => console.log(`express listening on port ${PORT}`));
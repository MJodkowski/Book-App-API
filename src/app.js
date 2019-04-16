const express = require('express'),
userRoute = require('./routes/user'),
bookRoute = require('./routes/book'),
app = express(),
PORT = process.env.PORT || 3000;
require('./db/mongoose');

app.use(express.urlencoded());
app.use('/user/', userRoute);
app.use('/book/', bookRoute);

app.listen(PORT, () => console.log(`express listening on port ${PORT}`));
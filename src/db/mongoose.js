const mongoose = require('mongoose'),
{dbAdmin, dbPassword} = require('../../config/config'),
connectionURI = `mongodb+srv://${dbAdmin}:${dbPassword}@mflix-d4hz2.mongodb.net/test?retryWrites=true`;

mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: 'users'
});
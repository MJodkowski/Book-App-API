import mongoose from 'mongoose';
import { dbAdmin, dbPassword } from '../../config/config';
const connectionURI = `mongodb+srv://${dbAdmin}:${dbPassword}@mflix-d4hz2.mongodb.net/test?retryWrites=true`;

mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: 'users'
});
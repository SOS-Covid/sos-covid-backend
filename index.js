const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./routes/user');

const app = express();

let url = 'mongodb://lianrolim:kq2bds@ds239703.mlab.com:39703/trincadb';

let mongoDB = process.env.MONGODB_URI || url;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro connect do mlab'));

let port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/user', user);

app.listen(port, () => {
    console.log('Server executing on port: ' + port);
});
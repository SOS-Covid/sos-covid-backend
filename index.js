const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const config = require('./config');

const user = require('./routes/user');

const app = express();

const mongoDB = config.db.mongodb.url;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro connect do mlab'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/user', user);

app.use((req, res, next) => {
    var err = new Error('Not Found')
    err.status = 404;
    next(err)
});

app.use(function ({ status, message }, req, res, next) {
    res.status(status || 500).json({ error: message });
});

app.listen(config.app.port, () => {
    console.log('Server executing on port: ' + config.app.port);
});
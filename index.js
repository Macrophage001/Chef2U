require('dotenv').config();

const express = require('express');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const password = "ygrgwkVhhrTLy62";

const app = express();
const port = process.env.port || 5000;

require('./mongoose')(password);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(require('cors')({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST'],
}));
app.use(cookieParser());
app.use(expressSession({
    key: 'userId',
    secret: crypto.randomBytes(32).toString('hex'),
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
    },
    resave: true,
}));

app.use('/api', require('./routes/apiRoute'));

app.listen(port, () => console.log('Listening on port: ' + port));
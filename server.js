const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('./server/routes');
const config = require('./server/config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// DB connection
console.log("Initiating connenction to MongoDB")
mongoose.connect('mongodb://localhost/test');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to mongo")
});

// Middleware
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Serve up main HTML document
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

// Where compiled CSS and JS files live
app.use('/static', express.static(__dirname + '/build/static'));

// Mount the API routes
app.use('/api', router);

app.listen(8080, function () {
  console.log('Navigate to http://localhost:8080/ to see the app.');
});

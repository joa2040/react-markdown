// app.js

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
var markdown = require('./routes/markdownRoute'); // 


// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb+srv://joaquin:1234@cluster0-l6qxi.mongodb.net/test?retryWrites=true&w=majority';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true } );
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/markdown', markdown);

var port = 8082;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

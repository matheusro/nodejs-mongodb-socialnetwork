var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment');
var app = express();

var login = require('./routes/login')
var timeline = require('./routes/timeline')
var people = require('./routes/people')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'squirrelly')

//Login
app.get('/', login.login)
app.get('/login', login.login)

//Timeline
app.get('/timeline', timeline.timeline)

//People
app.get('/people', people.people)

var server = app.listen(4000, function () { // This starts the server
    console.log("listening to request on port 4000");
});
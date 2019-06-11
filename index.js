var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment');
var app = express();

var login        = require('./routes/login')
var logout        = require('./routes/logout')
var timeline     = require('./routes/timeline')
var people       = require('./routes/people')
var followers    = require('./routes/followers')
var followuser   = require('./routes/followuser')
var unfollowuser = require('./routes/unfollowuser')
var post         = require('./routes/post')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'squirrelly')

//Login
app.get('/', login.login)
app.get('/login', login.login)

//Logout
app.get('/logout', logout.logout)

//Timeline
app.get('/timeline', timeline.timeline)

//People
app.get('/people', people.people)

//Followers
app.get('/followers', followers.followers)

//Followuser
app.get('/followuser', followuser.followuser)

//Unfollowuser
app.get('/unfollowuser', unfollowuser.unfollowuser)

//Post
app.get('/post', post.post)

var server = app.listen(4000, function () { // This starts the server
    console.log("listening to request on port 4000");
});
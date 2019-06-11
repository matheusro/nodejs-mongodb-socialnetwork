const db = require('../commons/db');
var moment = require('moment');

exports.timeline = function(req, res){
    var user = req.query.username;

    db.connect( function( err, client ) {
        if (err) console.log(err);            
            var followsCollection = db.getCollection('follows');
            var follows = followsCollection.find({user : user }).toArray(function(e, results) {
                var followedUsers = new Array();
                
                results.forEach(function(item){
                    followedUsers.push(item.follows);
                });
                buscaPosts(followedUsers, user, res)
            });                      
    } );   
};


function buscaPosts(followList, user, res){
    var postsCollection = db.getCollection('posts');
    var posts = postsCollection.find({user: { $in: followList }}).sort([['date', 1]]).toArray(function(e, results) {
        var postsList = new Array();

        results.forEach(function(item){
          var postContent = new Array();
          postContent[0] = item.user;
          postContent[1] = getFormatedDate(item.date);
          postContent[2] = item.content;
          
          postsList.push(postContent);
        });
        res.render('timeline', { user: user, postsList : postsList });
    });
}


function getFormatedDate(dateField) {
    return formatedDate = moment(dateField).format("MMM Do YY");
}
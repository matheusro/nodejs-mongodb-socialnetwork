const db = require('../commons/db');

exports.followers = function(req, res){
    var userName = req.query.username;
  
    db.connect( function( err, client ) {
        if (err) console.log(err);
        var followsCollection = db.getCollection('follows');
        
        var follows = followsCollection.find({follows : userName}).toArray(function(e, results) {
            var followersList = new Array();
            
            results.forEach(function(item){
                console.log(JSON.stringify(item))
                followersList.push(item.user);
            });
            res.render('followers', { user: userName, followersList : followersList });
          });
    } );   
};
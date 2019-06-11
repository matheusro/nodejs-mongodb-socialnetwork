const db = require('../commons/db');

exports.post = function(req, res){
    var userName = req.query.username;
    var postText = req.query.posttext;
    var postDate = new Date();
  
    db.connect( function( err, client ) {
        if (err) console.log(err);            
        var postsCollection = db.getCollection('posts');
        
        var postDocument = {
            user : userName,
            content : postText,
            date : postDate
        };

        console.log("postagem " + JSON.stringify(postDocument))

        postsCollection.insertOne(postDocument, function(err, r) {
            if (err) console.log(err);
            res.redirect('/timeline?username='+userName);
        });
    });   
};
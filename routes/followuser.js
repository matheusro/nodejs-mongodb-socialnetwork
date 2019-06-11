const db = require('../commons/db');

exports.followuser = function(req, res){
    var user = req.query.user;
    var name = req.query.name;

    db.connect( function( err, client ) {
        if (err) console.log(err);            
        var followsCollection = db.getCollection('follows');
        
        var followDocument = {
            user : user,
            follows : name
        };

        console.log("document" + JSON.stringify(followDocument))

        followsCollection.insertOne(followDocument, function(err, r) {
            if (err) console.log(err);
            res.redirect('/people?username='+user);
        });
    });   
};
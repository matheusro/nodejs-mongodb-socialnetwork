const db = require('../commons/db');

exports.people = function(req, res){
    var userName = req.query.username;
  
    db.connect( function( err, client ) {
        if (err) console.log(err);
        var peopleCollection = db.getCollection('users');      
        var people = peopleCollection.find({name: {$ne: userName} }).toArray(function(e, results) {
            var otherUsers = new Array();
            
            results.forEach(function(item){
                var otherUser = new Array();
                otherUser[0] = item.name //user name
                otherUser[1] = 0 //followed = 0 (FALSE)
                otherUsers.push(otherUser);
            });
            buscaFollows(userName, otherUsers, res);
        });
    } );   
};

function buscaFollows(userName, otherUsers, res){
    var followsCollection = db.getCollection('follows');
    
    var follows = followsCollection.find({user : userName}).toArray(function(e, results) {
        results.forEach(function(item){
            for(i=0; i < otherUsers.length; i++){                
                if(otherUsers[i][0] == item.follows){
                    otherUsers[i][1] = 1;
                }
            }
        });
        res.render('people', { user: userName, peopleList : otherUsers });
      });
}
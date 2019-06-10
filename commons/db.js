var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoDbUrl = 'mongodb://127.0.0.1:27017';
var mongodb;

function connect(callback){
    mongoClient.connect( mongoDbUrl,  { useNewUrlParser: true }, function( err, client ) {
        mongodb  = client.db('Nodjs_social_network');
        return callback( err );
    });
}
function getDb(){
    return mongodb;
}

function getCollection(name){
    var collection = mongodb.collection(name);
    return collection;
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    getDb,
    getCollection,
    close
};




/* function connectCollection(name){
    mongoClient.connect(mongoDbUrl, { useNewUrlParser: true }, (err, client) => {              
        mongodb = client.db("Nodjs_social_network");
        var collection = mongodb.collection(name);
        console.log("buscou " +  collection.collectionName);
        return collection;
    });
    
}


function findUserByName(collection){
    collection.find().toArray((err, items) => {
        console.log(items)
      })
}
 */
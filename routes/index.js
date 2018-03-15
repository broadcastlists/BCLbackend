var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://joshtalks:joshtalks@ds213759.mlab.com:13759/broadcast'
const assert = require('assert');

// Database Name
const dbName = 'broadcast';

// Use connect method to connect to the server

/* GET home page. */
router.get('/', async (req, res, next) => {
  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('data');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }

   await MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    const db = client.db(dbName);
    findDocuments(db, function() {
      client.close();
    });
  });
console.log("hello");
  res.render('index', { title: 'Express' });
});

module.exports = router;

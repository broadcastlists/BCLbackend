var http = require('http');
const MongoClient = require('mongodb').MongoClient;


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const assert = require('assert');
    
    // Connection URL
    const url = 'mongodb://joshtalks:joshtalks@ds213759.mlab.com:13759/broadcast';
    
    // Database Name
    const dbName = 'broadcast';
    
    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
    
      const db = client.db(dbName);
    
      // Insert a single document
      db.collection('data').find({}, function(err, r) {
        assert.equal(null, err);
        console.log(r.toArray())
    
          client.close();
        });
      });


    res.end(  JSON.stringify(
        {
            date : "24 jan 2015",
            data: "<Text>Hey ya hi</Text><Text>Hey ya hi</Text>"
        }
    ));
}).listen(process.env.PORT || 5000);
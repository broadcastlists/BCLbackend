const express = require('express')
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://joshtalks:joshtalks@ds213759.mlab.com:13759/broadcast';
app.set('view engine','ejs');
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});



app.get('/',async (req, res) => {
  MongoClient.connect(url, async (err, db) =>{
    if (err) throw err;
    console.log("connectd");
    var dbo = db.db("broadcast");
    var mysort = { date: -1 };
    await dbo.collection("data").find({}).sort(mysort).limit(1).toArray(function(err, result) {
      if (err) throw err;
      res.send(JSON.stringify(
        result
    ));
      db.close();
    });
  });

 
});

app.get('/broadcast',(req, res) => {
 res.render('add')

 
});

app.post('/add',(req, res) => {
  let d = {
    data : req.body.fname,
    date : Date()
  }

console.log(d);
  MongoClient.connect(url, async (err, db) =>{
    if (err) throw err;
    console.log("connectd");
    var dbo = db.db("broadcast");
    await dbo.collection("data").insertOne(d,function(err, result) {
      if (err) throw err;
res.send("Added");

      db.close();
    });
  });


})
app.listen(process.env.PORT || 5000);
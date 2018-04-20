const express = require('express')
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://joshtalks:joshtalks@ds213759.mlab.com:13759/broadcast';
app.set('view engine','ejs');
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.get('/',async (req, res) => {

  MongoClient.connect(url, async (err, db) =>{
    if (err) throw err;
    console.log("connectd");
    var dbo = db.db("broadcast");
    var mysort = { sno: -1 };
    await dbo.collection("data").find({}).sort(mysort).limit(1).toArray(function(err, result) {
      if (err) throw err;
      time = Math.floor((new Date(new Date().toISOString()) - new Date(result[0].date))/3600e3);
      if(time == 0)
     result[0].date = "now";
     else
     result[0].date = time + "h";
      res.send(JSON.stringify(
        result
    ));
      db.close();
    });
  });

 
});


app.get('/',async (req, res) => {
  
    MongoClient.connect(url, async (err, db) =>{
      if (err) throw err;
      console.log("connectd");
      var dbo = db.db("broadcast");
      var mysort = { sno: -1 };
      await dbo.collection("data").find({}).sort(mysort).limit(1).toArray(function(err, result) {
        if (err) throw err;
        time = Math.floor((new Date(new Date().toISOString()) - new Date(result[0].date))/3600e3);
        if(time == 0)
       result[0].date = "now";
       else
       result[0].date = time + "h";
        res.send(JSON.stringify(
          result
      ));
        db.close();
      });
    });
  
   
  });


  app.get('/find/:sno',async (req, res) => {
    
      MongoClient.connect(url, async (err, db) =>{
        if (err) throw err;
        console.log("connectd");
        var dbo = db.db("broadcast");
        await dbo.collection("data").find({sno:req.params.sno}).limit(1).toArray(function(err, result) {
          if (err) throw err;
          time = Math.floor((new Date(new Date().toISOString()) - new Date(result[0].date))/3600e3);
          if(time == 0)
         result[0].date = "now";
         else
         result[0].date = time + "h";
          res.send(JSON.stringify(
            result
        ));
          db.close();
        });
      });
    
     
    });

app.get('/old',async (req, res) => {
  
    MongoClient.connect(url, async (err, db) =>{
      if (err) throw err;
      console.log("connectd");
      var dbo = db.db("broadcast");
      var mysort = { sno: -1 };
      await dbo.collection("data").find({}).sort(mysort).limit(11).toArray(function(err, result) {
        if (err) throw err;
        res.send(JSON.stringify(
          result
      ));
        db.close();
      });
    });
  
   
  });

  

app.get('/broadcast',(req, res) => {
  MongoClient.connect(url, async (err, db) =>{
    if (err) throw err;
    console.log("connectd");
    var dbo = db.db("broadcast");
    var mysort = { sno: -1 };
    await dbo.collection("data").find({}).sort(mysort).limit(1).toArray(function(err, result) {
      if (err) throw err;
 res.render('add',{status:"",data : result[0].data,sno : result[0].sno })
      db.close();
    });
  });

 
});

app.post('/add',(req, res) => {
  let d = {
    data : req.body.fname,
    date : new Date().toISOString(),
    up : req.body.up,
    sno : req.body.sno,
  }

  if(d.up == "update")
  {
  MongoClient.connect(url, async (err, db) =>{
    if (err) throw err;
    console.log("connectd");
    var dbo = db.db("broadcast");
    await dbo.collection("data").deleteOne({sno:d.sno});    
    await dbo.collection("data").insertOne(d,function(err, result) {
      if (err) throw err;
      res.render('add',{...d,status:'updated'});

      db.close();
    });
  });
  }

  if(d.up == "addnew")
  {
    MongoClient.connect(url, async (err, db) =>{
      if (err) throw err;
      console.log("connectd");
      var dbo = db.db("broadcast");  
      await dbo.collection("data").insertOne(d,function(err, result) {
        if (err) throw err;
        res.render('add',{...d,status:'added'});
  
        db.close();
      });
    });
  }

})
app.listen(process.env.PORT || 5000);
var http = require("https");
const firebase = require('firebase');
const express = require('express')
const app = express();
const parser = require('body-parser');
const config = {
  apiKey: "AIzaSyDBSIKRbJ-z_IKlRAkqN8z_WalJsdOm9wY",
  authDomain: "broadcastlist-14cbe.firebaseapp.com",
  databaseURL: "https://broadcastlist-14cbe.firebaseio.com",
  projectId: "broadcastlist-14cbe",
  storageBucket: "broadcastlist-14cbe.appspot.com",
  messagingSenderId: "1016623347025"
};
//firebase initilization
firebase.initializeApp(config)

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
     {
       if(time >= 24)
       {
        result[0].date = Math.floor(time/24) + "d";
       }
       else{
     result[0].date = time + "h";
       }

    }
      res.send(JSON.stringify(
        result
    ));
      db.close();
    });
  });

 
});



app.get('/supriya',async (req, res) => {
  
    MongoClient.connect(url, async (err, db) =>{
      if (err) throw err;
      console.log("connectd");
      var dbo = db.db("broadcast");
      var mysort = { sno: -1 };
      await dbo.collection("data").find({user : "Supriya Paul"}).sort(mysort).limit(1).toArray(function(err, result) {
        if (err) throw err;        
        time = Math.floor((new Date(new Date().toISOString()) - new Date(result[0].date))/3600e3);
        if(time == 0)
       result[0].date = "now";
       else
       {
         if(time >= 24)
         {
          result[0].date = Math.floor(time/24) + "d";
         }
         else{
       result[0].date = time + "h";
         }
  
      }
        res.send(JSON.stringify(
          result
      ));
        db.close();
      });
    });
  
   
  });



  app.get('/palak',async (req, res) => {
    
      MongoClient.connect(url, async (err, db) =>{
        if (err) throw err;
        console.log("connectd");
        var dbo = db.db("broadcast");
        var mysort = { sno: -1 };
        await dbo.collection("data").find({user : "Palak Zatakia"}).sort(mysort).limit(1).toArray(function(err, result) {
          if (err) throw err;
          time = Math.floor((new Date(new Date().toISOString()) - new Date(result[0].date))/3600e3);
          if(time == 0)
         result[0].date = "now";
         else
         {
           if(time >= 24)
           {
            result[0].date = Math.floor(time/24) + "d";
           }
           else{
         result[0].date = time + "h";
           }
    
        }
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
         {
           if(time >= 24)
           {
            result[0].date = Math.floor(time/24) + "d";
           }
           else{
         result[0].date = time + "h";
           }
    
        }
          res.send(JSON.stringify(
            result
        ));
          db.close();
        });
      });
    
     
    });

app.get('/old/:user',async (req, res) => {
  
    MongoClient.connect(url, async (err, db) =>{
      if (err) throw err;
      console.log("connectd");
      var dbo = db.db("broadcast");
      var mysort = { sno: -1 };
      await dbo.collection("data").find({user :req.params.user}).sort(mysort).limit(11).toArray(function(err, result) {
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


app.get('/notification',(req, res) => {
 
  res.render('noti',{status:""})
  
 
});


app.post('/notificationsend',(req, res) => {
  let d = {
    title : req.body.title,
    body: req.body.body,
  }
  var options = {
    "method": "POST",
    "hostname": 
      "exp",
    "path": [
      "--",
      "api",
      "v2",
      "push",
      "send"
    ],
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  };
  var req = http.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  var result;
  firebase.database().ref('/users').once('value').then(function(snapshot) {
    let val = snapshot.val()
    result = Object.keys(val).map(function(key) {
      let inp = val[key];
      return inp[Object.keys(inp)];
    });
    result.forEach(element => {
      try {
req.write(JSON.stringify({ to: element,
  title: "ExponentPushToken[PfnsplIiFW6EQZ7QWt3N23]",
  body: t.body,
  sound: 'default',
  badge: 0 }));
req.end();
}
catch(error)
{
  console.log(error);
}
   
    });
  });
  res.render('noti',{status:"Notification Send"})
  
});


app.post('/add',(req, res) => {
  let d = {
    data : req.body.fname,
    user : req.body.user,
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
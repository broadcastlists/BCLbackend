var qs = require("querystring");
var http = require("https");

var options = {
    host: 'https://broadcastlists-notification.herokuapp.com',
    port: 80,
    path: '/index.php?title=hi&body=hi&token=ExponentPushToken[PfnsplIiFW6EQZ7QWt3N23]',
    method: 'POST'
  };
  
  http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  }).end();
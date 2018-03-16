var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(  JSON.stringify(
        {
            shivam : "shivam"
        }
    ));
}).listen(8080);
var http = require('http');
var path = require('path');
var Static = require('node-static');

var server = new Static.Server(path.join(__dirname, '../../build'));
var port = process.env.PORT || 8080;

http.createServer(function (req, res) {
    req.addListener('end', function () {
        server.serve(req, res, function () {
            server.serveFile('/index.html', 404, {}, req, res);
        });
    }).resume();
}).listen(port);

console.log('Listening on ' + port);

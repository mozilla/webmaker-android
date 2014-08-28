var http = require('http');
var path = require('path');
var Static = require('node-static');

var server = new Static.Server(path.join(__dirname, '../../build'));
var port = process.env.PORT || 8080;

http.createServer(function (req, res) {
    req.addListener('end', function () {
        server.serve(req, res, function () {
            server.serveFile('/index.html', 200, {}, req, res).on('error', function (err) {
                res.statusCode = 404;
                res.end('BUILDING...');
            });
        });
    }).resume();
}).listen(port);

console.log('Listening on ' + port);

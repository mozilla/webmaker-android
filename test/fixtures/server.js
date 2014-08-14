var http = require('http');
var Static = require('node-static');
var server = new Static.Server(__dirname + '/../../build');

http.createServer(function (req, res) {
    req.addListener('end', function () {
        server.serve(req, res, function () {
            server.serveFile('/index.html', 404, {}, req, res);
        });
    }).resume();
}).listen(8080);

console.log('Listening on 8080');
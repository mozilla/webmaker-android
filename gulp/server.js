var http = require('http');
var path = require('path');
var Static = require('node-static');

var handler = new Static.Server(path.join(__dirname, '../build'));
var port = process.env.PORT || 8080;
var server = http.createServer(function (req, res) {
    req.addListener('end', function () {
        handler.serve(req, res, function () {
            handler.serveFile('/index.html', 200, {}, req, res).on('error', function (err) {
                res.statusCode = 404;
                res.end('BUILDING...');
            });
        });
    }).resume();
});

module.exports = function () {
    server.listen(port);
    console.log('Listening on ' + port);
};

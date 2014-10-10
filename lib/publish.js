var publishEndpoint = 'http://webmaker-app-publisher.mofodev.net/publish';
var xhr = require('xhr');

module.exports = function (id, cb) {
    xhr({
        body: JSON.stringify({id: id}),
        uri: publishEndpoint,
        method: 'POST',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (err, resp, body) {
        if (err) return cb(err);
        if (!body) return cb('There was no response');
        cb(null, JSON.parse(body));
    });
};

var config = require('../config');
var xhr = require('xhr');

module.exports = function (id, username, cb) {
    xhr({
        body: JSON.stringify({id: id, username: username}),
        uri: config.PUBLISH_ENDPOINT,
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

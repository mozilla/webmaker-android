var config = require('../config');
var xhr = require('xhr');

module.exports = function (id, user, cb) {
    var body = {
        id: id,
        user: user
    };

    xhr({
        body: JSON.stringify(body),
        uri: config.PUBLISH_ENDPOINT,
        method: 'POST',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (err, resp, body) {
        if (err) return cb({
            status: resp.statusCode,
            message: body
        });
        if (!body) return cb('There was no response');
        cb(null, JSON.parse(body));
    });
};

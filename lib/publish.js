var config = require('../config');
var xhr = require('xhr');

module.exports = function (id, user, cb) {
  var body = {
    id: id,
    user: user
  };
  var cbSent = false;
  var timeout = setTimeout(function () {
    cbSent = true;
    cb({
      message: 'Sorry, we could not reach the publishing server!'
    });
  }, 10000);

  xhr({
    body: JSON.stringify(body),
    uri: config.PUBLISH_ENDPOINT,
    method: 'POST',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }, function (err, resp, body) {
    if (cbSent) {
      return;
    }
    clearTimeout(timeout);
    if (err) {
      return cb({
        status: resp.statusCode,
        message: body
      });
    }
    if (!body) {
      return cb({
        message: 'There was a problem publishing your app'
      });
    }
    cb(null, JSON.parse(body));
  });
};

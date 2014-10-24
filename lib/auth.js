var WebmakerAuthClient = require('webmaker-auth-client');
var page = require('page');
var config = require('../config');

var auth = new WebmakerAuthClient({
    host: config.LOGIN_URL,
    handleNewUserUI: false
});

auth.on('newuser', function (assertion, email) {
    page('/sign-up');
    auth._assertion = assertion;
    auth._email = email;
});

auth.on('logout', function () {
    auth._assertion = null;
    auth._email = null;
});


auth.on('error', function (err) {
    console.log(err);
});

module.exports = auth;

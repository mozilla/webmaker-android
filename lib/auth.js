var WebmakerAuthClient = require('webmaker-auth-client');
var page = require('page');

var auth = new WebmakerAuthClient({
    host: 'http://login-dev.mofodev.net',
    handleNewUserUI: false
});

auth.on('newuser', function (assertion, email) {
    page('/sign-up');
    auth._assertion = assertion;
    auth._email = email;
});

auth.on('error', function (err) {
    console.log(err);
});

module.exports = auth;

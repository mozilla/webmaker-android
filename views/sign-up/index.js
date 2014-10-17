var view = require('../../lib/view');
var auth = require('../../lib/auth');

module.exports = view.extend({
    id: 'sign-up',
    template: require('./index.html'),
    data: {
        // for navbar
        cancel: true,
        title: 'Sign up',
        user: {
            mailingList: true
        },
        login: auth.login,
        errors: {
            usernameTaken: false
        }
    },
    methods: {
        onDone: function () {
            var self = this;
            if (!self.$data.user.username) {
                return;
            }
            if (!self.$data.user.terms) {
                return;
            }

            auth.createUser({
                assertion: auth._assertion,
                user: {
                    username: self.$data.user.username,
                    mailingList: self.$data.user.mailingList
                }
            }, function () {
                console.log('done!');
            });

        },
        checkUsernameExists: function() {
            var self = this;
            if(!self.$data.user.username) {
                return;
            }

            auth.checkUsername(self.$data.user.username, function(error, message){
                if(error && message === 'Username taken') {
                    self.$data.errors.usernameTaken = true;
                }
                else {
                    self.$data.errors.usernameTaken = false;
                }
            });
        }
    },
    created: function () {
        var self = this;
        self.$data.email = auth._email;
        auth.on('newuser', function (assertion, email) {
            self.$data.email = email;
        });
    }
});

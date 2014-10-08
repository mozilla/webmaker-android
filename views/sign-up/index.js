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

        }
    },
    created: function () {
        var self = this;
        self.$data.email = auth._email;
        auth.on('newuser', function (assertion, email) {
            self.$data.email = email;
        });
        auth.on('login', function () {
            global.history.back();
        });
    }
});

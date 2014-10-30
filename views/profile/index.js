var view = require('../../lib/view');
var page = require('page');
var auth = require('../../lib/auth');

module.exports = view.extend({
    id: 'profile',
    template: require('./index.html'),
    data: {
        title: 'My Profile',
        back: false
    },
    computed: {
        user: function () {
            return this.model.data.user;
        },
        myApps: function () {
            // temporary hack to only show current user's data
            var username = this.model.data.user.username;
            var myApps = this.model.data.apps.filter(function (app) {
                return app.author.username === username;
            });
            return myApps;
        }
    },
    methods: {
        logout: function (e) {
            e.preventDefault();
            auth.logout();
        },
        clean: function (e) {
            var self = this;

            var username = this.model.data.user.username;
            this.model.data.apps.forEach(function (app, index) {
                if(app.author.username === username) {
                    delete self.model.data.apps[index];
                }
            });
            self.model.save(function() {
                page('/sign-in');
            });
        }
    }
});

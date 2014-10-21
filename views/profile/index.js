var view = require('../../lib/view');
var clone = require('clone');
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
            return this.model.data.apps;
        }
    },
    methods: {
        logout: function (e) {
            e.preventDefault();
            auth.logout();
        },
        clean: function (e) {
            var sh = this.model._fs.Shell();
            var fs = this.model._fs;
            var sync = fs.sync;
            fs.stat('/', function(e, stat) {
                if (!stat.isDirectory()) {
                    fs.unlink('/', function(e) {
                        sync.request();
                    });
                } else {
                    sh.rm('/', {
                        recursive: true
                    }, function(e) {
                        console.log(e);
                        sync.request();
                    });
                }
            });
        }
    }
});

var App = require('../../lib/app');
var view = require('../../lib/view');
var i18n = require('../../lib/i18n');
var publish = require('../../lib/publish');
var auth = require('../../lib/auth');
var page = require('page');

module.exports = view.extend({
    id: 'share',
    template: require('./index.html'),
    data: {
        title: 'Share',
        cancel: true,
        error: false
    },
    methods: {
        login: function (e) {
            e.preventDefault();
            auth.login();
        }
    },
    created: function () {
        var self = this;

        // Fetch app
        var id = self.$parent.$data.params.id;
        var app = new App(id);

        // Bind app
        self.$data.app = app.data;

        // Bind user
        self.$data.user = self.model.data.user;

        // Share message
        var message = i18n.get('share_message').replace('{{app.name}}', app.data.name);
        self.$data.shareMessage = message;


        // Publish
        var sync = self.model._sync;
        var syncTimeout;
        var isSynced = false;
        sync.once('completed', function() {
            isSynced = true;
        });
        self.$data.onDone = function () {
            if (self.$data.isPublishing) return;

            function onSynced() {
                publish(id, self.$data.user.username, function (err, data) {
                    global.clearTimeout(syncTimeout);
                    self.$data.isPublishing = false;
                    if (err) {
                        console.error(err);
                        self.$data.error = (err.status || 'Error') + ': ' + err.message;
                        return;
                    }
                    self.$data.error = false;
                    app.data.url = data.url;
                    var sms = 'sms:?body=' + encodeURI(self.$data.shareMessage) + ' ' + data.url;
                    window.location = sms;
                    page('/make/' + id + '/detail');
                });
            }

            // Show spinner
            self.$data.isPublishing = true;

            if (!isSynced) {
                syncTimeout = global.setTimeout(function() {
                    self.$data.isPublishing = false;
                    self.$data.error = 'Oops! Your publish is taking too long';
                }, 15000);
                sync.once('completed', onSynced);

            } else {
                onSynced();
            }

        };

    }
});

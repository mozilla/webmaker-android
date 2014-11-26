var App = require('../../lib/app');
var view = require('../../lib/view');
var i18n = require('../../lib/i18n');
var publish = require('../../lib/publish');
var page = require('page');

var PUBLISH_TIMEOUT = 20000;

module.exports = view.extend({
    id: 'share',
    template: require('./index.html'),
    data: {
        title: 'Share',
        cancel: true,
        error: false,
        isPublishing: true,
        doneDisabled: true
    },
    methods: {
        login: function (e) {
            e.preventDefault();
            this.model.auth.login();
        },
        onDone: function () {
            var self = this;
            if (!self.$data.app.url) return;
            var sms = 'sms:?body=' +
                encodeURIComponent(self.$data.shareMessage);
            window.location = sms;
            page('/make/' + self.$parent.$data.params.id + '/detail');
        }
    },
    ready: function () {
        var self = this;
        var id = self.$parent.$data.params.id;
        var app = new App(id);

        // Bind user
        self.$data.user = self.model.data.session.user;

        var message;

        // Bind app
        app.storage.once('value', function (snapshot) {
            self.$root.isReady = true;
            var val = snapshot.val();
            if (!val) return;
            self.$data.app = val;
            // Share message
            message = i18n
                .get('share_message')
                .replace('{{app.name}}', val.name);

            if (val.url) {
                self.$data.shareMessage = message + ': ' + val.url;
            }
        });

        var publishUrl = global.location.search.match('publish=true');
        if (!publishUrl && self.$data.app.url) {
            self.$data.isPublishing = false;
            return;
        }

        // Publish
        console.log('Starting publish...');
        self.$data.doneDisabled = true;

        var syncTimeout = global.setTimeout(function () {
            console.log('timed out');
            self.$data.isPublishing = false;
            self.$data.error = 'Oops! Your publish is taking too long';
        }, PUBLISH_TIMEOUT);

        var offlineError = 'We couldn\'t reach the publishing server. Sorry!';
        publish(id, self.$data.user, function (err, data) {
            global.clearTimeout(syncTimeout);
            self.$data.isPublishing = false;
            if (err) {
                console.error(err);
                if (err.status === 0) {
                    self.$data.error = offlineError;
                } else {
                    self.$data.error = (err.status || 'Error') +
                        ': ' + err.message;
                }
                return;
            }
            console.log('Published!');
            self.$data.error = false;
            self.$data.doneDisabled = false;
            app.update({
                url: data.url
            });
            self.$data.shareMessage = message + ': ' + data.url;
        });

    }
});

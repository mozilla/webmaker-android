var App = require('../../lib/app');
var view = require('../../lib/view');
var throttle = require('lodash.throttle');

module.exports = view.extend({
    id: 'edit',
    template: require('./index.html'),
    data: {
        back: true,
        doneLabel: 'Publish'
    },
    created: function () {
        var self = this;

        // Fetch app
        var id = self.$root.$data.params.id;

        var app = new App(id);
        self.$data.onDone = '/make/' + id + '/share?publish=true';
        app.storage.on('value', function (snapshot) {
            self.$root.isReady = true;
            if (!snapshot.val()) return;
            self.$data.app = snapshot.val();
            self.$data.app.id = snapshot.key();
        });
        self.$data.removeApp = function () {
            app.removeApp();
            self.page('/profile');
        };
        self.$watch('app.name', throttle(function (newVal) {
            app.update({
                name: newVal
            });
        }, 3000));
    }
});

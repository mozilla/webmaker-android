var App = require('../../lib/app');
var view = require('../../lib/view');
var Data = require('../../lib/data');

module.exports = view.extend({
    id: 'play',
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

        app.storage.on('value', function (snapshot) {
            self.$root.isReady = true;
            if (!snapshot.val()) return;
            self.$data.app = snapshot.val() || {};
            self.$data.app.id = snapshot.key();
        });
        self.$data.onDone = '/make/' + id + '/share?publish=true';
        self.$data.offlineUser = this.model.data.session.offline;

        // Listen for Data Submitted by the User
        var data = new Data(id);

        self.$on('dataChange', function (index, value, label) {
            data.collect(index, value, label);
        });

        self.$on('dataSave', function () {
            if (data.getCurrentCollectedCount() > 0) {
                data.save();
                self.$broadcast('dataSaveSuccess');
            }
        });

    }
});

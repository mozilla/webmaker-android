var view = require('../../lib/view');
var Data = require('../../lib/data');

module.exports = view.extend({
    id: 'play',
    template: require('./index.html'),
    data: {
        back: true
    },
    created: function () {
        var self = this;
        var id = self.$root.params.id;

        self.$data.id = id;

        // Fetch app
        var app = self.$root.storage.getApp(id);

        if (app.data) {
            self.$root.isReady = true;
            self.$data.app = app.data;
        }

        self.$on(id, function (val) {
            self.$root.isReady = true;
            self.$data.app = val;
        });

        // Handle save events
        // ---------------------------------------------------------------------
        var data = new Data(id);
        self.$on('dataSave', function () {
            data.collect(this.$el, function onDataSave(err) {
                if (err) return console.log('[Firebase] ' + err);
                self.$broadcast('dataSaveSuccess');
            });
        });
    }
});

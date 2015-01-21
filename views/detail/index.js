var view = require('../../lib/view');

module.exports = view.extend({
    id: 'detail',
    template: require('./index.html'),
    data: {
        back: true,
        title: 'App'
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
    }
});

var App = require('../../lib/app');
var view = require('../../lib/view');

module.exports = view.extend({
    id: 'detail',
    template: require('./index.html'),
    data: {
        back: true,
        title: 'App'
    },
    methods: {
        create: function () {
            var self = this;
            var app = App.createApp({
                data: self.$data.app
            });
            app.data.enteredEditorFrom = '/make/' + app.id + '/detail';
            self.page('/make/' + app.id + '/edit');
        }
    },
    created: function () {
        var self = this;
        // Fetch app
        var id = self.$root.params.id;
        var app = new App(id);

        app.storage.on('value', function (snapshot) {
            var val = snapshot.val();
            self.$root.isReady = true;
            if (!val) return;
            // Bind app
            self.$data.id = id;
            self.$data.app = val;
        });

    }
});

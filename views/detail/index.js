var view = require('../../lib/view');
var templates = require('../../lib/templates');
var clone = require('clone');

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
            var options = {};
            if (self.$data.isTemplate) {
                options.template = self.$root.params.id;
            } else {
                options.data = self.$data.app;
            }
            var app = self.$root.storage.createApp(options, function (err) {
                // The problem here is that this only runs when
                // the *remote* server syncs. So if we're in an offline state,
                // this callback won't be run
                if (err) console.log(err);
            });

            self.$data.create = false;
            self.$root.$data.enteredEditorFrom = '/templates';
            self.$root.isReady = false;
            setTimeout(function () {
                self.$root.isReady = true;
                self.page('/make/' + app.id);
            }, 100);
            
        }
    },
    created: function () {
        var self = this;
        var id = self.$root.params.id;

        self.$data.id = id;
        self.$data.isTemplate = self.$root.params.template;
        // Fetch app
        if (self.$data.isTemplate) {
            templates.forEach(function (template) {
                var data;
                if (template.id === id) {
                    data = clone(template);
                    data.id = id;
                    self.$data.app = data;
                }
                self.$root.isReady = true;
            });
        } else {
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

    }
});

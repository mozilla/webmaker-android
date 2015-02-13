var templates = require('../../lib/templates.json');
var view = require('../../lib/view');

module.exports = view.extend({
    id: 'templates',
    template: require('./index.html'),
    data: {
        title: 'Make Your Own App',
        templates: templates
    },
    methods: {
        onClick: function(e) {
            var self = this;
            var storage = self.$root.storage;
            var id = e.currentTarget.getAttribute('data-id');
            if (id === 'blank') {
                e.preventDefault();
                var self = this;
                var options = {
                    template: self.$root.params.id
                };
                var app = self.$root.storage.createApp(options);

                self.$data.create = false;
                self.$root.$data.enteredEditorFrom = '/templates';
                self.$root.isReady = false;
                setTimeout(function() {
                    self.$root.isReady = true;
                    self.page('/make/' + app.id);
                }, 100);

                e.preventDefault();
                var app = storage.createApp({
                    template: id
                });
                self.$root.$data.enteredEditorFrom = '/templates';
                self.$root.isReady = false;
                setTimeout(function() {
                    self.$root.isReady = true;
                    self.page('/make/' + app.id);
                }, 1000);
            }
        }
    }
});
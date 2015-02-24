var view = require('../../lib/view');
var templates = require('../../lib/templates');
var clone = require('clone');

module.exports = view.extend({
    id: 'template-preview',
    template: require('./index.html'),
    data: {
        back: '/templates'
    },
    methods: {
        create: function (e) {
            e.preventDefault();
            this.createAppFromTemplate(this.$root.params.id);
        }
    },
    created: function () {
        var self = this;
        var id = self.$root.params.id;

        self.$data.id = id;
        templates.forEach(function (template) {
            var data;
            if (template.id === id) {
                data = clone(template);
                data.id = id;
                self.$data.app = data;
                self.$data.title = data.templateTitle;
            }
            self.$root.isReady = true;
        });
    }
});

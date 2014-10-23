var App = require('../../lib/app');
var view = require('../../lib/view');
var templates = require('../../lib/templates.json');
var utils = require('../../lib/utils');

module.exports = view.extend({
    id: 'detail',
    template: require('./index.html'),
    data: {
        back: true,
        title: 'App'
    },
    created: function () {
        var self = this;
        // Fetch app
        var id = self.$parent.$data.params.id;
        var app = new App(id).data;
        if (!app) app = templates[utils.findInArray(templates, 'id', id)] || {};

        // Bind app
        self.$data.id = id;
        self.$data.app = app;
    }
});

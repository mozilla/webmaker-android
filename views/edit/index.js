var App = require('../../lib/app');
var templates = require('../../lib/templates.json');
var view = require('../../lib/view');
var page = require('page');

module.exports = view.extend({
    id: 'edit',
    template: require('./index.html'),
    data: {
        cancel: '/profile'
    },
    created: function () {
        var self = this;

        // Fetch app
        var id = self.$parent.$data.params.id;
        var app = new App(id);

        // Bind app
        self.$data.app = app.data || {};
        self.$data.onDone = '/make/' + id + '/share';
        self.$data.removeApp = function() {
            app.removeApp();
            self.page('/profile');
        };
    }
});

var App = require('../../lib/app');
var templates = require('../../lib/templates.json');
var view = require('../../lib/view');
var Data = require('../../lib/data');

module.exports = view.extend({
    id: 'play',
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
        self.$data.app = app.data;
        self.title = app.data.name;

        self.$data.onDone = '/make/' + id + '/share';

		// Listen for Data Submitted by the User
		var data = new Data(id);

		self.$on('dataChange', function(index, value, label) {
			data.collect(index, value, label);
		});

		self.$on('dataSave', function() {
			data.save();
		});
    }
});

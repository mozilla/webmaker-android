var App = require('../../lib/app');
var templates = require('../../lib/templates.json');
var view = require('../../lib/view');
var Data = require('../../lib/data');

module.exports = view.extend({
    id: 'data',
    template: require('./index.html'),
	currentDataSets: {},
    created: function () {
        var self = this;

        // Fetch app
        var id = self.$parent.$data.params.id;
        var app = new App(id);

        // Bind app
        self.$data.app = app.data;
        self.title = app.data.name;

		// Fetch collected Data
		var data = new Data(id);
		self.currentDataSets = data.getAllDataSets();
		console.log(self.currentDataSets);
    }
});

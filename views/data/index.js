var App = require('../../lib/app');
var templates = require('../../lib/templates.json');
var view = require('../../lib/view');

module.exports = view.extend({
    id: 'data',
    template: require('./index.html'),
	collectedData: {},
    created: function () {
        var self = this;

        // Fetch app
        var id = self.$parent.$data.params.id;
        var app = new App(id);

        // Bind app
        self.$data.app = app.data;
        self.title = app.data.name;

		// Fetch collected Data
		self.collectedData = {
			0: {'name': 'fgsdfgsdfg', 'age': '12'},
			1: {'name': 'dsfgd', 'age': '13'},
			2: {'name': 'fgsdfsfdgdsf gsdfg', 'age': '15'},
			3: {'name': 'cxvbcvbx', 'age': '35'}
		};
    }
});

var Data = require('../../../lib/data');

module.exports = {
    id: 'data-editor',
    template: require('./index.html'),
	data: {
        options: ['Newest', 'Oldest'],
        currentDataSets: {},
        isInteractive: true
    },
    ready: function () {
        var self = this;
        // Fetch collected Data
        var data = new Data('foooobar');
        self.currentDataSets = data.getAllDataSets();
    }
};

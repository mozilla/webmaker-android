var Data = require('../../lib/data');

module.exports = {
    className: 'data',
    template: require('./index.html'),
    data: {
        name: 'Data',
        icon: '/images/blocks_text.png',
        attributes: {
            
        },
        currentDataSets: {},
    },
    ready: function (){
        var self = this;

		// Fetch collected Data
		var data = new Data('foooobar');
		self.currentDataSets = data.getAllDataSets();
		console.log(self.currentDataSets);
    }
};

var Data = require('../../lib/data');

module.exports = {
    className: 'data',
    template: require('./index.html'),
    data: {
        name: 'Data',
        icon: '/images/blocks_text.png',
        attributes: {
            label: {
                label: 'Header Text',
                type: 'string',
                value: '',
                placeholder: 'Responses',
                skipAutoRender: true
            },
            color: {
                label: 'Header and Title Text Color',
                type: 'color',
                value: '#36494A',
                skipAutoRender: true
            }
        },
        currentDataSets: [],
        isInteractive: false,
        sortOldest: false
    },
    ready: function (){
        var self = this;
		// Fetch collected Data

		/*var data = new Data('foooobar');
		self.currentDataSets = [];
		data.getAllDataSets(function(currentDataSets) {
			self.currentDataSets = currentDataSets;
		});*/
    }
};

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
            data: {
                label: 'Sorting',
                type: 'data',
                value: false,
                skipAutoRender: true
            }
        },
        currentDataSets: {},
        isInteractive: false
    },
    ready: function (){
        var self = this;
		// Fetch collected Data
		var data = new Data('foooobar');
		self.currentDataSets = data.getAllDataSets();
    }
};

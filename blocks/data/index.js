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
        initialDataLoaded: false,
        isInteractive: false,
        sortOldest: false
    },

    ready: function (){
        var self = this;

        if (!self.$data || !self.$data.currentDataSets || self.$data.currentDataSets.length === 0) self.$data.initialDataLoaded = false;

		// Fetch collected Data
		self.currentDataSets = [];
		if(!self.isEditing) {
			var data = new Data(self.$parent.$parent.$data.app.id);

			data.getAllDataSets(function(currentDataSets) {
                self.$data.initialDataLoaded = true;
                self.currentDataSets = currentDataSets;
			});
		}
        else {
            self.$data.initialDataLoaded = true;
        }
    }
};

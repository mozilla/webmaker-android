module.exports = {
    className: 'spinner',
    template: require('./index.html'),
    data: {
        name: 'Spinner',
        icon: '/images/blocks_text.png',
        attributes: {
			min: {
				label: 'Minimum Number',
				type: 'number',
				value: '0'
			},
			max: {
				label: 'Maximum Number',
				type: 'number',
				value: '100'
			},
			step: {
				label: 'Steps when incrementing / decrementing',
				type: 'number',
				value: '1'
			}
        }
    },
	ready: function() {
		var self = this;

		if(self.$parent.$parent.$data.params.mode !== 'play') {
			self.$el.querySelector('input').disabled = 'disabled';
		}
	}
};

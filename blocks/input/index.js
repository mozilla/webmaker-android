module.exports = {
    className: 'input-block',
    template: require('./index.html'),
	lazy: false,
    data: {
        name: 'Input',
        icon: '/images/blocks_text.png',
        attributes: {
			value: {
				label: 'Value',
				type: 'string',
				value: 'Default Value',
				skipAutoRender: true
			},
			label: {
				label: 'Label',
				type: 'string',
				value: 'I am your Label',
				skipAutoRender: true
			}
        }
    },
	methods: {
		reportDataChange: function(self) {
			self.$dispatch('dataChange',
				self.$index,
				self.$el.querySelector('input').value
			);
		}
	},
	ready: function() {
		var self = this;

		if(self.$parent.$parent.$data.params.mode !== 'play') {
			self.$el.querySelector('input').disabled = 'disabled';
		} else {
			// register block on data object
			self.$dispatch('dataChange',
				self.$index,
				self.$data.attributes.value.value,
				self.$data.attributes.label.value
			);
		}
	}
};
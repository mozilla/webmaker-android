module.exports = {
    className: 'spinner',
    template: require('./index.html'),
    data: {
        name: 'Counter',
        icon: '/images/blocks_text.png',
        attributes: {
            label: {
                label: 'Title',
                type: 'string',
                value: '',
                placeholder: 'Your title goes here',
                skipAutoRender: true
            },
            color: {
                label: 'Title Text Color',
                type: 'color',
                value: '#638093'
            },
			min: {
				label: 'Minimum Number',
				type: 'number',
				value: '0',
				skipAutoRender: true
			},
            current: {
                label: 'Initial Number',
                type: 'number',
                value: '',
                placeholder: 'same as minimum number',
                skipAutoRender: true
            },
			max: {
				label: 'Maximum Number',
				type: 'number',
				value: '100',
				skipAutoRender: true
			},
			step: {
				label: 'Increment by',
				type: 'number',
				value: '1',
				skipAutoRender: true
			}
        }
    },
	ready: function() {
		var self = this;
        if (self.attributes.current.value === 'undefined' || self.attributes.current.value === '') self.attributes.current.value = self.attributes.min.value;

		if(self.$parent.$parent.$data.params.mode !== 'play') {
			var inputElements = self.$el.querySelectorAll('input, button');
            for (var i = 0; i < inputElements.length; i++) {
                inputElements[i].disabled = 'disabled';
            }
		}
        if(self.$parent.$parent.$data.params.mode === 'edit') {
            if (self.attributes.current.value === self.attributes.min.value) self.attributes.current.value = '';
        }
	},
    methods :{
        stepUp: function() {
            this.$el.querySelector('input[type="number"]').stepUp();
        },
        stepDown: function() {
            this.$el.querySelector('input[type="number"]').stepDown();
        }
    }
};

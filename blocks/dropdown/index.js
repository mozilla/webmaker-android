module.exports = {
    className: 'dropdown',
    template: require('./index.html'),
    data: {
        name: 'Dropdown',
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
                label: 'Color',
                type: 'color',
                value: '#638093'
            },
			elements: {
				label: 'Options',
				type: 'list',
				skipAutoRender: true,
				items: ['', '']
			}
        }
    },
	ready: function() {
		var self = this;

		if(self.$parent.$parent.$data.params.mode !== 'play') {
			self.$el.querySelector('select').disabled = 'disabled';
			self.$el.querySelector('select').style.pointerEvents = 'none';
		}
	}
};

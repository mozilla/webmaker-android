module.exports = {
    className: 'dropdown',
    template: require('./index.html'),
    data: {
        name: 'Dropdown',
        icon: '/images/blocks_text.png',
        attributes: {
			label: {
				label: 'Text',
				type: 'string',
				value: 'I am the label',
				skipAutoRender: true
			},
			elements: {
				label: 'Elements',
				type: 'list',
				skipAutoRender: true,
				items: ['']
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
module.exports = {
    className: 'submit',
    template: require('./index.html'),
    data: {
        name: 'Submit',
        icon: '/images/blocks_text.png',
        attributes: {
			innerHTML: {
				label: 'Button Text',
				type: 'string',
				value: 'Submit'
			},
            color: {
                label: 'Button Color',
                type: 'color',
                value: '#32B2D2'
            }
		}
    }
};

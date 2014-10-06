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
    },
	methods: {
		save: function(e) {
			var self = this;

			self.$el.querySelector('button').disabled = 'disabled';
			self.$el.querySelector('button').style.pointerEvents = 'none';
			// TODO: implement something better when data is submitted
			self.$el.querySelector('button').innerHTML = 'Data submitted!';

			self.$dispatch('dataSave');
		}
	}
};

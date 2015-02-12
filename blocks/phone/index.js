module.exports = {
    className: 'phone',
    template: require('./index.html'),
    data: {
        name: 'Phone',
        icon: 'images/blocks_phone.png',
        attributes: {
            number: {
                label: 'Phone #',
                type: 'string',
                value: '+18005555555'
            },
            innerHTML: {
                label: 'Label',
                type: 'string',
                value: 'Place call'
            },
            color: {
                label: 'Button Color',
                type: 'color',
                value: '#64A8EE',
                skipAutoRender: true
            }
        }
    },
    created: function () {
        var self = this;

        // Disable if editing mode
        self.$data.onClick = function (e) {
            e.preventDefault();
            window.location = 'tel:' + self.$data.attributes.number.value;
        };
    }
};

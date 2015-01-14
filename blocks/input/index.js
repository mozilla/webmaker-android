module.exports = {
    className: 'input-block',
    template: require('./index.html'),
    lazy: false,
    data: {
        name: 'Text Box',
        icon: 'images/blocks_input.png',
        attributes: {
            inputType: {
                label: 'Text Box Type',
                type: 'dropdownChoice',
                options: ['Single Line Text', 'Long Text'],
                value: 0,
                skipAutoRender: true
            },
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
            }
        }
    },
    methods: {
        reportDataChange: function (self) {
            self.$dispatch('dataChange',
                this.$index,
                self.$el.value
            );
        }
    },
    ready: function () {
        var self = this;
        self.$dispatch('dataChange',
            self.$index,
            '',
            self.$data.attributes.label.value
        );
    }
};

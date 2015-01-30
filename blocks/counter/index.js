module.exports = {
    className: 'counter',
    template: require('./index.html'),
    data: {
        name: 'Counter',
        icon: 'images/blocks_counter.png',
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
    ready: function () {
        var self = this;
        if (
            self.attributes.current.value === 'undefined' ||
            self.attributes.current.value === ''
        ) {
            self.attributes.current.value = self.attributes.min.value;
        }

        self.$dispatch('dataChange',
            self.$index,
            self.$el.querySelector('input[type="number"]').value,
            self.$data.attributes.label.value
        );
    },
    methods: {
        stepUp: function () {
            this.$el.querySelector('input[type="number"]').stepUp();
        },
        stepDown: function () {
            this.$el.querySelector('input[type="number"]').stepDown();
        },
        reportDataChange: function (self) {
            self.$dispatch('dataChange',
                this.$index,
                self.$el.querySelector('input[type="number"]').value
            );
        }
    }
};

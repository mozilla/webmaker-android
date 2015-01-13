module.exports = {
    id: 'switch',
    template: require('./index.html'),
    ready: function () {
        this.$watch('value', function (newVal) {
            var chosenOption = 0 + newVal; // convert Boolean to Number
            chosenOption = this.options[chosenOption];
            this.$dispatch('switchValueChanged', chosenOption);
        });
    },
    data: {
        value: false,
        options: ['Off', 'On']
    },
    methods: {
        onClick: function (event) {
            this.value = !this.value;
        }
    }
};

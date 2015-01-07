module.exports = {
    className: 'contact-picker',
    template: require('./index.html'),
    ready: function () {
        this.$on('openContactPicker', function (event) {
            this.show = true;
        });
    },
    methods: {
        onSave: function (e) {
            this.show = false;
        },
        onCancel: function (e) {
            this.selectedColor = this.originalColor;
            this.show = false;
        }
    },
    data: {}
};

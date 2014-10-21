module.exports = {
    className: 'alert-container',
    template: require('./index.html'),
    paramAttributes: ['type', 'message'],
    computed: {
        icon: function () {
            return this.type === 'success' ? 'fa-check-circle' : 'fa-times-circle'
        }
    }
};

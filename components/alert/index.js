module.exports = {
    className: 'alert-container',
    template: require('./index.html'),
    paramAttributes: ['type', 'message', 'no-margin'],
    computed: {
        icon: function () {
            return this.type === 'success' ? 'fa-check-circle' : 'fa-times-circle';
        },
        classes: function () {
            var classes = 'alert alert-' + (this.$data.type || 'error');
            if (this.$data['no-margin'] || this.$data['no-margin'] === 0) {
                classes += ' no-margin';
            }
            return classes;
        }
    }
};

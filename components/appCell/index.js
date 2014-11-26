var i18n = require('../../lib/i18n');

module.exports = {
    className: 'app-cell',
    data: {
        onClick: function () {
            this.$root.$data.enteredEditorFrom = '/profile';
        }
    },
    template: require('./index.html'),
    paramAttributes: ['mode', 'template'],
    computed: {
        guestKey: function () {
            return i18n.get('Guest');
        }
    }
};

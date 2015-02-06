var i18n = require('../../lib/i18n');

module.exports = {
    className: 'app-cell',
    ready: function () {
        this.constructedURL = (this.prefix ? this.prefix : '') + this['app-id'];
    },
    methods: {
        onClick: function () {
            this.$root.$data.enteredEditorFrom = '/profile';
        }
    },
    data: {
        constructedURL: ''
    },
    paramAttributes: ['prefix', 'app-id', 'suffix'],
    template: require('./index.html'),
    computed: {
        guestKey: function () {
            return i18n.get('Guest');
        }
    }
};

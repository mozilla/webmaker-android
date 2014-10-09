var view = require('../../lib/view');
var auth = require('../../lib/auth');

module.exports = view.extend({
    id: 'ftu-3',
    template: require('./index.html'),
    methods: {
        login: function (e) {
            e.preventDefault();
            auth.login();
        }
    }
});

var view = require('../../lib/view');
var auth = require('../../lib/auth');

module.exports = view.extend({
    id: 'sign-in',
    template: require('./index.html'),
    computed: {
        username: function () {
            return this.model.data.user.username;
        },
        offline: function () {
            // Todo: detect internet connection
            return false;
        }
    },
    methods: {
        login: function (e) {
            e.preventDefault();
            auth.login();
        },
        goOffline: function (e) {
            e.preventDefault();
            this.model.offlineConnect();
            this.page('/templates');
        }
    }
});

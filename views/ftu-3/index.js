var view = require('../../lib/view');
var auth = require('../../lib/auth');

module.exports = view.extend({
    id: 'ftu-3',
    template: require('./index.html'),
    computed: {
        offline: function () {
            return this.model.offline;
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

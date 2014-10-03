var view = require('../../lib/view');
var auth = require('../../lib/auth');

module.exports = view.extend({
    id: 'loader',
    template: require('./index.html'),
    data: {
        login: function () {
            auth.login();
        }
    },
    ready: function () {
        this.$data.user = this.model.data.user;
    }
});

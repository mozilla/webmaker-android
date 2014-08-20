var model = require('../../lib/model');
var view = require('../../lib/view');

module.exports = view.extend({
    id: 'profile',
    components: {
        tabBar: require('../../components/tabBar'),
        navigationBar: require('../../components/navigationBar')
    },
    template: require('./index.html'),
    created: function () {
        this.$data = model.user;
    },
    detached: function () {
        model.user.name = this.$data.name;
        model.user.location = this.$data.location;
        model.user.avatar = this.$data.avatar;
    }
});

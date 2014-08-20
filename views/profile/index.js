var view = require('../../lib/view');

module.exports = view.extend({
    id: 'profile',
    components: {
        tabBar: require('../../components/tabBar'),
        navigationBar: require('../../components/navigationBar')
    },
    template: require('./index.html'),
    created: function () {
        this.$data = this.model.user;
    },
    detached: function () {
        this.model.user.name = this.$data.name;
        this.model.user.location = this.$data.location;
        this.model.user.avatar = this.$data.avatar;
    }
});

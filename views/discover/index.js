var view = require('../../lib/view');

module.exports = view.extend({
    id: 'discover',
    template: require('./index.html'),
    data: {
        title: 'Discover'
    },
    created: function () {
        this.$data.created = this.model.data.apps;
    }
});

var view = require('../../lib/view');

module.exports = view.extend({
    id: 'apps',
    template: require('./index.html'),
    data: {
        title: 'Apps'
    },
    created: function () {
        this.$data.created = this.model.apps;
    }
});

var view = require('../../lib/view');

module.exports = view.extend({
    id: 'apps',
    components: {
        tabBar: require('../../components/tabBar'),
        navigationBar: require('../../components/navigationBar'),
        appCell: require('../../components/appCell')
    },
    template: require('./index.html'),
    data: require('./data.json')
});

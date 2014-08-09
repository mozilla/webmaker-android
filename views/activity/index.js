require('insert-css')(require('./index.css'));

module.exports = {
    id: 'activity',
    components: {
        tabBar: require('../../components/tabBar'),
        navigationBar: require('../../components/navigationBar')
    },
    template: require('./index.html'),
    data: {}
};
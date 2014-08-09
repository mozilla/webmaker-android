require('insert-css')(require('./index.css'));

module.exports = {
    id: 'profile',
    components: {
        tabBar: require('../../components/tabBar'),
        navigationBar: require('../../components/navigationBar')
    },
    template: require('./index.html'),
    data: require('./data.json')
};
module.exports = {
    id: 'discover',
    components: {
        tabBar: require('../../components/tabBar'),
        navigationBar: require('../../components/navigationBar'),
        discoverCell: require('../../components/discoverCell')
    },
    template: require('./index.html'),
    data: {
        personas: require('./data.json')
    }
};
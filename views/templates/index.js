module.exports = {
    id: 'templates',
    components: {
        tabBar: require('../../components/tabBar'),
        navigationBar: require('../../components/navigationBar'),
        templateCell: require('../../components/templateCell')
    },
    template: require('./index.html'),
    data: {
        personas: require('../../lib/templates.json')
    }
};

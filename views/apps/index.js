require('insert-css')(require('./index.css'));

var xhr = require('xhr');
var storage = require('localforage');

module.exports = {
    id: 'discover',
    components: {
        tabBar: require('../../components/tabBar'),
        navigationBar: require('../../components/navigationBar'),
        appCell: require('../../components/appCell')
    },
    template: require('./index.html'),
    data: require('./data.json')
};
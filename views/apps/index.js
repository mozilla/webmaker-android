require('insert-css')(require('./index.css'));

var xhr = require('xhr');
var storage = require('localforage');

module.exports = {
    id: 'discover',
    components: {
        tabBar: require('../../components/tabBar'),
        navigationBar: require('../../components/navigationBar')
    },
    template: require('./index.html'),
    data: {}
};
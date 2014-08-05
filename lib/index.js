var domready = require('domready');
var page = require('page');
// var storage = require('../../localForage/dist/localforage.js');

domready(function () {
    page('/', function () {
        console.log('discover');
    });

    page('/apps', function () {
        console.log('apps');
    });

    page('*', function () {
        console.log('other');
    });

    page({
        click: true,
        popstate: true
    });
});

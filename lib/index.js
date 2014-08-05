var domready = require('domready');
var page = require('page');

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

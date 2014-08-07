/**
 * An app that makes apps.
 *
 * @package wookiee
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var domready = require('domready');
var Vue = require('vue');

var router = require('./router');

domready(function () {
    // Register views
    Vue.component('discover', require('../views/discover'));
    Vue.component('apps', require('../views/apps'));
    Vue.component('activity', require('../views/activity'));
    Vue.component('profile', require('../views/profile'));

    // Vue.component('play', require('../views/play'));
    // Vue.component('edit', require('../views/edit'));
    // Vue.component('data', require('../views/data'));
    // Vue.component('brick', require('../views/brick'));

    // Create "app"
    var app = new Vue({
        el: '#app',
        data: {
            currentView: 'discover',
            title: 'Discover'
        }
    });

    // Bind routes to the app
    router(app);
});

// var domready = require('domready');
// var page = require('page');
// var storage = require('localforage');
// var xhr = require('xhr');

// domready(function () {
//     var content = document.getElementById('content');

//     storage.setItem('foo', 'bar', function () {
//         storage.getItem('foo', function (item) {
//             console.dir(item);
//         });
//     });

//     page('/', function () {
//         console.log('discover');
//     });

//     page('/apps', function () {
//         console.log('apps');
//         xhr('./templates/discover.html', function (err, resp, body) {
//             content.innerHTML = body;
//         });
//     });

//     page('/activity', function () {
//         console.log('activity');
//     });

//     page('/me', function () {
//         console.log('me');
//     });

//     page('*', function () {
//         console.log('other');
//     });

//     page({
//         click: true,
//         popstate: true
//     });
// });

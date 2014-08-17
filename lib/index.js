/**
 * An app that makes apps.
 *
 * @package appmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var domready = require('domready');
var Vue = require('vue');

var router = require('./router');

domready(function () {
    // Register views
    Vue.component('templates', require('../views/templates'));
    Vue.component('apps', require('../views/apps'));
    Vue.component('profile', require('../views/profile'));
    Vue.component('detail', require('../views/detail'));

    // Vue.component('play', require('../views/play'));
    // Vue.component('edit', require('../views/edit'));
    // Vue.component('block', require('../views/brick'));

    // Create "app"
    var app = new Vue({
        el: '#app',
        data: {
            currentView: 'templates',
            title: 'Templates'
        }
    });

    // Bind routes to the app
    router(app);
});

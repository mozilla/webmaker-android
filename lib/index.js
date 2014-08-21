/**
 * An app that makes apps.
 *
 * @package appmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var Vue = require('vue');

var model = require('./model');
var langs = require('./langs');
var i18n = require('./i18n');
var router = require('./router');

// Restore user state
model.restore(function (err) {
    if (err) throw new Error('Could not restore user state.');

    // Register views
    Vue.component('templates', require('../views/templates'));
    Vue.component('apps', require('../views/apps'));
    Vue.component('profile', require('../views/profile'));
    Vue.component('detail', require('../views/detail'));

    Vue.component('play', require('../views/play'));
    Vue.component('edit', require('../views/edit'));
    Vue.component('add', require('../views/add'));
    // Vue.component('attributes', require('../views/attributes'));

    Vue.component('ftu', require('../views/ftu'));
    // Vue.component('ftuEditor', require('../views/ftuEditor'));

    // Register localization
    i18n.bind(langs, Vue);

    // Create "app"
    var app = new Vue({
        el: '#app',
        data: {
            currentView: 'templates',
            title: 'Templates',
            target: null,
            mode: null
        }
    });

    // Route
    router(app);

});

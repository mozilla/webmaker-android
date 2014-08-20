/**
 * An app that makes apps.
 *
 * @package appmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var Vue = require('vue');

var model = require('./model');
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
    //temp inline. needs build step
    i18n.addLanguage('en-US', {
        'Name': 'Name',
        'Location': 'Location',
        'name from location': '<strong>{{name}}</strong> from <strong>{{location}}</strong>',
        'by user.name': 'by {{user.name}}'
    });
    i18n.bind(Vue);

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

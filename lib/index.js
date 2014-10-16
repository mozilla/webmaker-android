/**
 * An app that makes apps.
 *
 * @package webmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var Vue = require('vue');
var page = require('page');

var i18n = require('./i18n');
var locale = require('../locale');
var router = require('./router');
var model = require('./model')();

// Register views
Vue.component('loader', require('../views/loader'));
Vue.component('ftu', require('../views/ftu'));
Vue.component('ftu-2', require('../views/ftu-2'));
Vue.component('ftu-3', require('../views/ftu-3'));

Vue.component('discover', require('../views/discover'));
Vue.component('templates', require('../views/templates'));
Vue.component('profile', require('../views/profile'));
Vue.component('sign-up', require('../views/sign-up'));

Vue.component('play', require('../views/play'));
Vue.component('edit', require('../views/edit'));
Vue.component('add', require('../views/add'));
Vue.component('block', require('../views/block'));
Vue.component('share', require('../views/share'));
Vue.component('detail', require('../views/detail'));

Vue.component('color-picker', require('../views/color-picker'));

// Register localization
i18n.bind(locale, Vue);

// Create "app"
var app = new Vue({
    el: '#app',
    data: {
        currentView: 'loader',
        params: null
    },
    created: function () {
        model.restore(function onLogin(err) {
            if (err) throw new Error('Could not restore the model.');

            // i18n
            i18n.setLocale(model.data.locale, true);

            // Route
            router(app);

            // If cold start, restore from history
            var pathname = window.location.pathname;
            var paths = ['/', '/index.html', '/ftu', '/ftu-2', '/ftu-3'];
            console.log('[Loader] ' + pathname);
            if (model.data.history && paths.indexOf(pathname) > -1) {
                var restore = model.data.history.path;
                console.log('[Loader] Restore to ' + restore);
                if (paths.indexOf(restore) > -1) {
                    restore = '/templates';
                }
                // Redirect
                page(restore);
            }
        }, function onLogout(err) {
            // i18n
            i18n.setLocale(null, true);

            // Router
            router(app);
        });
    }
});

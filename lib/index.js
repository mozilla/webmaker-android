/**
 * An app that makes apps.
 *
 * @package appmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var Vue = require('vue');

var i18n = require('./i18n');
var langs = require('./langs');
var router = require('./router');

// Register views
Vue.component('loader', require('../views/loader'));
Vue.component('ftu', require('../views/ftu'));

Vue.component('templates', require('../views/templates'));
Vue.component('apps', require('../views/apps'));
Vue.component('profile', require('../views/profile'));
Vue.component('detail', require('../views/detail'));

Vue.component('play', require('../views/play'));
Vue.component('edit', require('../views/edit'));
Vue.component('add', require('../views/add'));
Vue.component('block', require('../views/block'));

// Register localization
i18n.bind(langs, Vue);

// Create "app"
var app = new Vue({
    el: '#app',
    data: {
        currentView: 'loader',
        params: null
    }
});

// Route
router(app);

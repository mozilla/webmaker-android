/**
 * An app that makes apps.
 *
 * @package webmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var Vue = require('vue');

var i18n = require('./i18n');
var locale = require('../locale');
var router = require('./router');
var model = require('./model')();
var attachFastClick = require('fastclick');
var Store = require('./storage');

// Register views
Vue.component('error', require('../views/error'));
Vue.component('sign-in', require('../views/sign-in'));


Vue.component('discover', require('../views/discover'));
Vue.component('templates', require('../views/templates'));
Vue.component('profile', require('../views/profile'));

Vue.component('make', require('../views/make'));
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
        currentView: null,
        params: null,
        isReady: false
    },
    created: function () {
        var self = this;
        model.restore(function (user) {

            var userId = user && user.id || model.data.session.guestId;

            // i18n
            i18n.setLocale(model.data.session.locale, true);

            var storage = new Store(self);
            storage.setQuery(userId);
            
            self.storage = storage;

            // Todo: auth
            // if (user.firebaseToken) {
            //     storage._firebase.authWithCustomToken(
            //         user.firebaseToken, function (err, authData) {
            //             if (err) console.log('Fb auth error', err);
            //             router(app);
            //         }
            //     );
            // } else {
            //     storage._firebase.unauth();
            //     router(app);
            // }

            // Route
            router(app);

        });
    },
    ready: function () {
        attachFastClick(document.body);
    }
});

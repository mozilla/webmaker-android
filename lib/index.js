/**
 * An app that makes apps.
 *
 * @package webmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */
require('./shims');

var Vue = require('vue');

var i18n = require('./i18n');
var locale = require('../locale');
var router = require('./router');
var model = require('./model')();
var Store = require('./storage');
var restorePath = require('./restore-path');

// Register views
Vue.component('healthcheck', require('../views/healthcheck'));
Vue.component('error', require('../views/error'));
Vue.component('sign-in', require('../views/sign-in'));

Vue.component('discover', require('../views/discover'));
Vue.component('templates', require('../views/templates'));
Vue.component('template-preview', require('../views/template-preview'));
Vue.component('profile', require('../views/profile'));

Vue.component('make', require('../views/make'));
Vue.component('add', require('../views/add'));
Vue.component('block', require('../views/block'));
Vue.component('share', require('../views/share'));
Vue.component('detail', require('../views/detail'));

var componentList = {
    appCell: require('../components/appCell'),
    makeBar: require('../components/makeBar'),
    navigationBar: require('../components/navigationBar'),
    tabBar: require('../components/tabBar'),
    alert: require('../components/alert'),
    dataRepresentation: require('../components/dataRepresentation'),
    switch: require('../components/switch'),
    loadingIndicator: require('../components/loadingIndicator'),
    contactPicker: require('../components/contactPicker'),
    toggle: require('../components/toggle'),
    sideMenu: require('../components/sideMenu'),
    modalPrompt: require('../components/modalPrompt'),
    shim: require('../components/shim')
};

// Register localization
i18n.bind(locale, Vue);

// Create "app"
var app = new Vue({
    el: '#app',
    components: componentList,
    data: {
        currentView: null,
        params: null,
        isReady: false,
        alertOn: false
    },
    methods: {
        showAlert: function (message) {
            var self = this;
            self.$data.alertMessage = message;
            self.$data.alertOn = true;
            setTimeout(function () {
                self.$data.alertOn = false;
            }, 2000);
        }
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
            restorePath({
                history: model.data.session && model.data.session.path,
                offline: model.data.session.offline
            });
        });
    },
    ready: function () {
        // Mediate events between sibling components
        // eg: Menu -> Root -> Modal

        this.$on('sideMenuDeleteClick', function (event) {
            this.$broadcast('sideMenuDeleteClick', event);
        });

        this.$on('openModalPrompt', function (event) {
            this.$broadcast('openModalPrompt', event);
        });

        this.$on('onConfirmClick', function (event) {
            this.$broadcast('onConfirmClick', event);
        });

        this.$on('sideMenuClosed', function (event) {
            if (!event.keepShimOpen) {
                this.$broadcast('closeShim', event);
            }
        });

        this.$on('modalPromptClosed', function (event) {
            this.$broadcast('closeShim', event);
        });

    }
});

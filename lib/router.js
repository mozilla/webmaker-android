var page = require('page');
var model = require('./model')();
var attachFastClick = require('fastclick');
var UA = require('./ua');
var fastclick;

module.exports = function (app) {
    // Track history for session restoration
    page(function (ctx, next) {
        if (!model._ready) return next();
        model.data.session.path = ctx.path;
        if (!UA.isFirefoxOS) {
            if (fastclick) fastclick.destroy();
            fastclick = attachFastClick(document.body);
        }
        document.querySelector('#app').scrollTop = 0;
        next();
    });

    page('/healthcheck', function () {
        app.$data.isReady = true;
        app.currentView = 'healthcheck';
    });

    page('/', function () {
        app.$data.isReady = true;
        app.currentView = 'templates';
    });

    page('/discover', function () {
        app.$data.isReady = true;
        app.currentView = 'discover';
    });

    page('/templates', function () {
        app.$data.isReady = true;
        app.currentView = 'templates';
    });

    page('/profile', function () {
        app.currentView = 'profile';
    });

    // Interior
    page('/make/:id', function (e) {
        app.currentView = 'make';
        app.params = e.params;
    });

    page('/play/:id', function (e) {
        app.currentView = 'play';
        app.params = e.params;
    });

    page('/template/:id/detail', function (e) {
        app.currentView = 'template-preview';
        app.params = e.params;
        app.$broadcast('closeShim');
    });

    page('/make/:id/block/:index', function (e) {
        app.currentView = 'block';
        app.params = e.params;
    });

    page('/make/:id/:mode/:role?', function (e) {
        if (['add', 'detail'].indexOf(e.params.mode) === -1) {
            app.currentView = 'error';
            app.params = {code: 404};
            return;
        }
        app.currentView = e.params.mode;
        app.params = e.params;
    });

    page('/sign-in', '/');

    // // Cordova
    page.redirect('/:platform/www/index.html', '/');

    // Configuration
    page('*', function () {
        app.currentView = 'error';
        app.params = {code: 404};
    });

    // Init
    page({
        click: true
    });
};

var page = require('page');
var model = require('./model')();
var attachFastClick = require('fastclick');

var fastclick;

module.exports = function (app) {
    // Track history for session restoration
    page(function (ctx, next) {
        if (!model._ready) return next();
        model.data.session.path = ctx.path;
        if (fastclick) fastclick.destroy();
        fastclick = attachFastClick(document.body);
        next();
    });

    page('/healthcheck', function () {
        app.$data.isReady = true;
        app.currentView = 'healthcheck';
    });

    page('/', function () {
        app.$data.isReady = true;
        app.currentView = 'sign-in';
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
    page('/make/:id/:mode', function (e) {
        if (['add', 'share', 'detail'].indexOf(e.params.mode) === -1) {
            app.currentView = 'error';
            app.params = {code: 404};
            return;
        }
        app.currentView = e.params.mode;
        app.params = e.params;
    });

    page('/template/:id/detail', function (e) {
        app.currentView = 'template-preview';
        app.params = e.params;
    });

    page('/make/:id/block/:index', function (e) {
        app.currentView = 'block';
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
        hashbang: true,
        click: true
    });
};

var page = require('page');
var model = require('./model');

module.exports = function (app) {
    // Track history for session restoration
    page(function (e, next) {
        if (!model._ready) return next();

        model.history.path = e.path;
        next();
    });

    // Exterior
    page('/ftu', function () {
        app.currentView = 'ftu';
    });

    page('/ftu-2', function () {
        app.currentView = 'ftu-2';
    });

    page('/ftu-3', function () {
        app.currentView = 'ftu-3';
    });

    page('/templates', function () {
        app.currentView = 'templates';
    });

    page('/apps', function () {
        app.currentView = 'apps';
    });

    page('/apps/:url', function (e) {
        app.currentView = 'detail';
        app.params = e.params;
    });

    page('/profile', function () {
        app.currentView = 'profile';
    });

    // Interior
    page('/make/:id/:mode', function (e) {
        app.currentView = e.params.mode;
        app.params = e.params;
    });

    page('/make/:id/block/:index', function (e) {
        app.currentView = 'block';
        app.params = e.params;
    });

    // Configuration
    page('*', function () {
        console.log('404');
    });

    // Init
    setTimeout(function () {
        page({
            click: true,
            popstate: true
        });
    }, 250);
};

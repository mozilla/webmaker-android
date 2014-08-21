var page = require('page');
var model = require('./model');

module.exports = function (app) {
    page(function (e, next) {
        if (!model._ready) return next();

        if (e.path === '/') {
            model.history.path = '/templates';
        } else {
            model.history.path = e.path;
        }

        next();
    });

    /**
     * Exterior
     */
    page('/templates', function () {
        app.currentView = 'templates';
    });

    page('/ftu', function () {
        app.currentView = 'ftu';
    });

    page('/ftu-2', function () {
        app.currentView = 'ftu-2';
    });

    page('/ftu-3', function () {
        app.currentView = 'ftu-3';
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

    /**
     * Interior
     */
    page('/make/:id/:mode', function (e) {
        app.currentView = e.params.mode;
        app.params = e.params;
        // app.title = 'Edit';
        // app.target = e.params.id;
        // app.mode = e.params.mode;
    });

    /**
     * Configuration
     */
    page('*', function () {
        console.log('404');
    });

    page({
        click: true,
        popstate: true
    });
};

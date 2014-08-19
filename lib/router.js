var page = require('page');
var model = require('./model');

module.exports = function (app) {
    page(function (e, next) {
        // Don't save the state on first run
        if (model.history.ftu) {
            model.history.ftu = false;
            return next();
        }

        // Update history with current path (if not root)
        if (e.path === '/') {
            model.history.path = null;
        } else {
            model.history.path = e.path;
        }

        // Continue
        next();
    });

    /**
     * Exterior
     */
    page('/', function () {
        app.currentView = 'templates';
        app.title = 'Templates';
    });

    page('/ftu', function () {
        app.currentView = 'ftu';
        app.title = '';
    });

    page('/apps', function () {
        app.currentView = 'apps';
        app.title = 'Apps';
    });

    page('/apps/:url', function (e) {
        app.currentView = 'detail';
        app.title = 'Details';
        app.params = e.params;
    });

    page('/profile', function () {
        app.currentView = 'profile';
        app.title = 'Me';
    });

    /**
     * Interior
     */
    page('/make/:id/:mode', function (e) {
        app.currentView = e.params.mode;
        app.title = '';
        app.target = e.params.id;
        app.mode = e.params.mode;
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

    /**
     * Restore from history
     */
    page(model.history.path);
};

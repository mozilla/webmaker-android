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

    page('/', function (c) {
        app.currentView = 'templates';
        app.title = 'Templates';
    });

    page('/apps', function () {
        app.currentView = 'apps';
        app.title = 'Apps';
    });

    page('/profile', function () {
        app.currentView = 'profile';
        app.title = 'Me';
    });

    page('*', function () {
        console.log('404');
    });

    page({
        click: true,
        popstate: true
    });

    // Restore saved state
    model.on('ready', function () {
        page(model.history.path);
    });
};

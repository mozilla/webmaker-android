var page = require('page');
var localforage = require('localforage');
var firstRun = true;

module.exports = function (app) {
    page(function (e, next) {
        // don't save the state on first run
        if (firstRun) {
            firstRun = false;
            return next();
        }

        // clear the state for home page
        if (e.path == '/') {
            localforage.setItem('state', null);
        } else {
            localforage.setItem('state', {
                title: e.title,
                path: e.path
            });
        }

        next();
    });

    page('/', function (c) {
        app.currentView = 'discover';
        app.title = 'Discover';
    });

    page('/apps', function () {
        app.currentView = 'apps';
        app.title = 'Apps';
    });

    page('/activity', function () {
        app.currentView = 'activity';
        app.title = 'Activity';
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

    // check for saved state to load
    localforage.getItem('state', function (loc) {
        if (loc) {
            page(loc.path);
        }
    });
};

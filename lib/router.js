var page = require('page');

module.exports = function (app) {
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
};

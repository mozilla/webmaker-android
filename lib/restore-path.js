var page = require('page');

module.exports = function (options) {
    options = options || {};

    var history = options.history;
    var offline = options.offline;
    var pathname = options.pathname || global.location.pathname;

    var defaultPath = '/templates';
    var coldStart = ['/', '/index.html'];
    var noRestore = offline ? coldStart : coldStart.concat(['/ftu', '/ftu-2', '/ftu-3', '/sign-up']);

    function isAllowed(path) {
        return noRestore.indexOf(path) === -1;
    }

    // Don't restore if pathname is allowed.
    if (isAllowed(pathname)) return;

    // Restore from history... but not if history is in noRestore
    if (history && isAllowed(history)) {
        console.log('[Loader] You visited ' + pathname + '; redirecting to your history, ' + history);
        page(history);
    } else {
        console.log('[Loader] You visited ' + pathname + '; redirecting to ' + defaultPath);
        page(defaultPath);
    }

};

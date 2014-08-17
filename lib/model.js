/**
 * Data model provider.
 *
 * @package appmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var localforage = require('localforage');
var watch = require('watchjs').watch;

/**
 * Constructor
 */
function Model () {
    var self = this;

    // Internal
    self._ns = '_model';
    self._errorHandler = function (prefix, err) {
        if (typeof err === 'undefined') {
            err = prefix;
            prefix = 'Model';
        }

        if (err) throw new Error('[' + prefix + '] ' + err);
    };

    // Public
    self.history = {
        ftu: true,
        path: '/'
    };
    self.user = {};
    self.apps = {};

    // Restore state & start "watch"-ing
    self.restore(function (err) {
        if (err) throw new Error('Could not restore user state.');
        self.observe();
    });
}

/**
 * Restores the model from localforage.
 *
 * @param  {Function} callback
 *
 * @return {void}
 */
Model.prototype.restore = function (callback) {
    var self = this;

    localforage.getItem(self._ns, function (item) {
        if (item === null) return callback(null);

        if (typeof item.history !== 'undefined') self.history = item.history;
        if (typeof item.user !== 'undefined') self.user = item.user;
        if (typeof item.apps !== 'undefined') self.apps = item.apps;
        callback(null);
    });
};

/**
 * Saves the current model state to localforage.
 *
 * @param  {Function} callback
 *
 * @return {void}
 */
Model.prototype.save = function (callback) {
    var self = this;

    localforage.setItem(self._ns, {
        history: self.history,
        user: self.user,
        apps: self.apps
    }, function (item) {
        if (typeof item !== 'object') return callback('Could not persist data');
        callback(null);
    });
};

/**
 * Starts observing ("watch"-ing) for object changes.
 *
 * @return {void}
 */
Model.prototype.observe = function () {
    var self = this;

    watch(self.history, function () {
        self.save('History', self._errorHandler);
    }, 1);

    watch(self.user, function () {
        self.save('User', self._errorHandler);
    }, 1);

    watch(self.apps, function (path) {
        console.log(path + ' app updated');
        // @todo
    }, 10);
};

/**
 * Export
 */
module.exports = new Model();

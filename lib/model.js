/**
 * Data model provider.
 *
 * @package webmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var MakeDrive = require('makedrive');
var watch = require('watchjs').watch;
var utils = require('./utils');

var MAKEDRIVE_URL = 'ws://makedrive.mofodev.net';

/**
 * Constructor
 */
function Model (options) {
    var self = this;

    if (!(self instanceof Model)) return new Model();

    // Options
    // memory: (false) Use memory provider for Makedrive
    // noConnect: () if true, will not connect to remote server
    self.options = options || {};

    if (!self.options.noConnect) {
        var auth = require('./auth');
    }

    self.connectAttempt = false;

    // Internal
    self._ns = '/_model';
    self._ready = false;
    self._logger = function (prefix, msg) {
        if (typeof msg === 'undefined') {
            msg = prefix;
            prefix = 'Model';
        }

        if (msg) console.log('[' + prefix + '] ' + msg);
    };

    // Public
    self.history = {
        ftu: true,
        path: '/ftu'
    };
    self.locale = null;
    self.user = {};
    self.apps = [];

    // Makedrive + login
    self._fs = MakeDrive.fs({
        memory: self.options.memory,
        interval: 10000
    });
    self._sync = self._fs.sync;

    self._sync.on('connected', function() {
        self._logger('Makedrive connected');
    });
    self._sync.on('error', self._logger);
    self._sync.on('completed', function() {
        self._logger('Sync Completed');
    });
    self._sync.on('syncing', function() {
        self._logger('Syncing');
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
    self._fs.readFile(self._ns, function (err, item) {
        if (err && err.code === 'ENOENT') {
            self._logger('No saved file found.');
            self.observe();
            return callback(null);
        }

        if (!item) {
            self._logger('File was empty');
            return callback(null);
        }
        item = JSON.parse(item);

        if (typeof item.history !== 'undefined') self.history = item.history;
        if (typeof item.user !== 'undefined') self.user = item.user;
        if (typeof item.apps !== 'undefined') self.apps = item.apps;
        if (typeof item.locale !== 'undefined') self.locale = item.locale;
        self.observe();
        self._logger('Data restored');

        // Sign in and connect
        if (!self.options.noConnect) {
            auth.on('login', function (user) {
                self._logger('login');
                if (!self.connectAttempt) {
                    self._logger('Connecting...');
                    self._sync.connect(MAKEDRIVE_URL);
                    self.connectAttempt = true;
                }
                self.user = user;
            });
            auth.on('logout', function () {
                self._logger('logout');
                self.user = {};
            });
            auth.verify();
        }

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
    callback = callback || function (){};

    var item = {
        history: self.history,
        user: self.user,
        apps: self.apps,
        locale: self.locale,
    };
    putItem = JSON.stringify(item);
    self._fs.writeFile(self._ns, putItem, function (item) {
        self._logger('Data saved');
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
        // remove myApps from user object. we don't need to save it in the user.
        self.user.myApps = [];
        self.save(self._logger);
    }, 1);

    watch(self.user, function () {
        self.save(self._logger);
    }, 1);

    watch(self.locale, function () {
        self.save(self._logger);
    }, 1);

    watch(self.apps, function (path) {
        self.save(self._logger);
    }, 10);

    self._ready = true;
};

var model;

function instantiateModel (options) {
    // If the instance doesn't exist, create it.
    if (!model) model = new Model(options);
    return model;
}

module.exports = instantiateModel;

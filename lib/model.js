/**
 * Data model provider.
 *
 * @package webmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var MakeDrive = require('makedrive');
var watch = require('watchjs').watch;
var utils = require('./utils');
var config = require('../config');
var page = require('page');

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
       self.auth = require('./auth');
    }

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
    self.data = {};
    self.data.history = {
        ftu: true,
        path: '/ftu'
    };
    self.data.locale = null;
    self.data.user = {};
    self.data.apps = [];

    self._fs = MakeDrive.fs({
        memory: self.options.memory,
        interval: 10000
    });
    self._sync = self._fs.sync;
}

/**
 * Restores the model from localforage.
 *
 * @param  {Function} callback
 *
 * @return {void}
 */
Model.prototype.restore = function (callback, onLogout) {
    var self = this;

    function onRead(err, item) {
        if (err && err.code === 'ENOENT') {
            self._logger('New user file created');
            self._fs.writeFile(self._ns, JSON.stringify(self.data), function (err) {
                callback.call(self, err);
            });
            return;
        } else if (err) {
            self._logger('Makedrive error');
            return callback.call(self, err);
        }
        if (!item) {
            self._logger('File was empty');
            return callback.call(self, null);
        }

        item = JSON.parse(item);

        if (typeof item.history !== 'undefined') self.data.history = item.history;
        if (typeof item.apps !== 'undefined') self.data.apps = item.apps;
        if (typeof item.locale !== 'undefined') self.data.locale = item.locale;
        self._logger('Data restored');
        self._ready = true;
        callback.call(self, null);
    }

    function offlineConnect() {
        self._logger('Starting in offline mode');
        self._fs.readFile(self._ns, onRead);
        self.offline = true;
        self.observe();
    }

    var syncTimeout;

    // Just read locally if no connect
    if (self.options.noConnect || global.location.search.match('offline=true') || config.OFFLINE) {
        offlineConnect();
        return;
    }

    self._sync.on('error', function (err) {
        self._logger(err);
    });

    // Syncing files
    self._sync.on('completed', function() {
        self._logger('Sync Completed');
    });
    self._sync.on('syncing', function() {
        self._logger('Syncing');
    });

    // Connected
    self._sync.on('connected', function() {
        global.clearTimeout(syncTimeout);
        self._logger('Makedrive connected');
        self._fs.readFile(self._ns, onRead);
        self.observe();
    });

    // Login
    self.auth.on('login', function (user) {
        self._logger('login');
        self.data.user = user;

        if ([self._sync.SYNC_CONNECTED, self._sync.SYNC_CONNECTING].indexOf(self._sync.state) === -1) {
            self._sync.connect(config.MAKEDRIVE_URL);
            // After 5 seconds, switch to offline mode
            syncTimeout = global.setTimeout(function () {
                offlineConnect();
            }, 5000);

            self._logger('Connecting...');
        }
    });
    self.auth.on('logout', function () {
        self._logger('logout');
        self.data.user = {};
        onLogout.call(self, null);
    });
    self.auth.verify();

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

    putItem = JSON.stringify(self.data);
    self._fs.writeFile(self._ns, putItem, function (item) {
        self._logger('Data saved');
        callback.call(self, null);
    });
};

/**
 * Starts observing ("watch"-ing) for object changes.
 *
 * @return {void}
 */
Model.prototype.observe = function () {
    var self = this;

    // Only run this once
    if (self.observing) return;
    self.observing = true;

    watch(self.data, function () {
        self.save(self._logger);
    }, 10);
};

var model;

function instantiateModel (options) {
    // If the instance doesn't exist, create it.
    if (!model) model = new Model(options);
    return model;
}

module.exports = instantiateModel;

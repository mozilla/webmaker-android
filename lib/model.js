/**
 * Data model provider.
 *
 * @package webmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var MakeDrive = require('makedrive');
var watch = require('watchjs').watch;
var utils = require('./utils');
var page = require('page');

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

    // Makedrive + login
    window.fS = self._fs = MakeDrive.fs({
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
Model.prototype.restore = function (callback, onLogout) {
    var self = this;

    function onRead(err, item) {
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

        if (typeof item.history !== 'undefined') self.data.history = item.history;
        if (typeof item.apps !== 'undefined') self.data.apps = item.apps;
        if (typeof item.locale !== 'undefined') self.data.locale = item.locale;
        self._logger('Data restored');
        self._ready = true;
        callback(null);
    }

    // Just read locally if no connect
    if (self.options.noConnect) {
        self._fs.readFile(self._ns, onRead);
        self.observe();
        return;
    }

    // Otherwise, sign in and connect
    self._sync.on('connected', function() {
        self._fs.readFile(self._ns, onRead);
        if (!self.connectAttempt) {
            self.observe();
        }
        self.connectAttempt = true;
    });
    self.auth.on('login', function (user) {
        self._logger('login');
        self.data.user = user;
        if (self._sync.state !== self._sync.SYNC_CONNECTED) {
            self._sync.connect(MAKEDRIVE_URL);
            self._logger('Connecting...');
        }
    });
    self.auth.on('logout', function () {
        self._logger('logout');
        self.data.user = {};
        onLogout();
        if (self._sync.state === self._sync.SYNC_CONNECTED) {
            self._sync.disconnect();
            page('/ftu-3');
        } else {
            page('/ftu');
        }
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

/**
 * Data model provider.
 *
 * @package appmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

// Temp dev solution
var MAKEDRIVE_URL = 'ws://makedrive.alicoding.com?username=wmobiledev';

var MakeDrive = require('makedrive');
var watch = require('watchjs').watch;
var utils = require('./utils');

/**
 * Constructor
 */
function Model (options) {
    var self = this;

    if (!(self instanceof Model)) return new Model();

    // Options
    // memory: (false) Use memory provider for Makedrive
    // noConnect: () if true, will not connect to remove server
    options = options || {};

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

    // Makedrive
    self._fs = MakeDrive.fs({
        memory: options.memory,
        manual: true
    });
    self._sync = self._fs.sync;
    if (!options.noConnect) {
        self._sync.connect(MAKEDRIVE_URL)
    }
    self._sync.on('connected', function() {
        self._logger('Makedrive connected')
    });
    self._sync.on('error', self._logger);
    self._sync.on('completed', function() {
        self._logger('Sync Completed');
    });
    self._sync.on('syncing', function() {
        self._logger('Syncing');
    });

    // Public
    self.history = {
        ftu: true,
        path: '/ftu'
    };
    self.locale = null;
    self.user = {
        name: null,
        location: null,
        avatar: null
    };
    self.apps = [
        {
            id: '000d1745-5d3c-4997-ac0c-15df68bbbecz',
            name: 'Sample App',
            icon: '/images/placeholder_puppy.png',
            author: {
                name: 'Andrew',
                location: 'Portland',
                avatar: '/images/avatar_puppy.png'
            },
            blocks: []
        }
    ];
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
        self._sync.request();
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

/**
 * Export
 */
module.exports = Model;

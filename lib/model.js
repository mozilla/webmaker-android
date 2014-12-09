/**
 * Data model provider.
 *
 * @package webmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var watch = require('watchjs').watch;
var config = require('../config');
var page = require('page');
var restorePath = require('./restore-path');
var localForage = require('localforage');
var uuid = require('./uuid');

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
    self._sessionKey = 'webmaker.app.session';
    self._ready = false;
    self._logger = function (prefix, msg) {
        if (typeof msg === 'undefined') {
            msg = prefix;
            prefix = 'Model';
        }

        if (msg) console.log('[' + prefix + '] ', msg);
    };

    // Public
    self.data = {};
    self.data.session = {
        ftu: true,
        path: '/sign-in',
        locale: null,
        offline: false,
        guestId: uuid(),
        user: {}
    };

}

Model.prototype.restoreSession = function restoreSession(callback) {
    var self = this;
    localForage.getItem(self._sessionKey, function (err, val) {
        if (err) {
            callback(err);
        }
        try {
            val = JSON.parse(val);
            for (var key in self.data.session) {
                if (typeof val[key] !== 'undefined') {
                    self.data.session[key] = val[key];
                    self._logger('restore session: ' + key, val[key]);
                }
            }
            callback(null);
        } catch (e) {
            callback(e);
        }
    });
};

Model.prototype.restore = function (callback) {
    var self = this;

    // Set offline callback
    self.offlineConnect = function () {
        self._logger('Starting in offline mode');
        self.data.session.offline = true;
        self.data.session.user = {};
        callback();
        restorePath({
            history: self.data.session && self.data.session.path,
            offline: self.data.session.offline
        });

    };

    self.restoreSession(function onRestore(err) {
        self._logger('session restore', err || 'successful');
        self.observe();
        self.ftu = false;
        self._ready = true;

        // Were we in offline mode? If so, restore it.
        // Just read locally if no connect
        if (self.data.session.offline ||
        self.options.noConnect ||
        global.location.search.match('offline=true') ||
        config.OFFLINE) {
            self.offlineConnect();
        }
        if (self.options.noConnect) {
            return;
        }

        // Otherwise, let's set up a connection
        var syncTimeout = setTimeout(function () {
            self.offlineConnect();
        }, 10000);

        function onLogin(user) {
            self._logger('login');
            self.data.session.user = user;

            global.clearTimeout(syncTimeout);
            self.data.session.user = user;
            self.data.session.offline = false;

            callback(user);

            restorePath({
                history: self.data.session && self.data.session.path,
                offline: self.data.session.offline
            });
        }

        function onLogout() {
            self._logger('logout');
            self.data.session.user = {
                id: self.data.session.guestId
            };
            if (self.data.session.offline) return;
            callback();
            page('/sign-in');
        }

        var setup = false;
        self.auth = require('./auth')();
        self.auth.on('error', function (err) {
            if (err.cors === 'rejected') {
                if (setup) return;
                global.clearTimeout(syncTimeout);
                self.offlineConnect();
                setup = true;
            }
        });
        self.auth.on('verified', function (user) {
            self._logger('verified');
            if (setup) {
                return;
            } else if (user) {
                onLogin(user);
                setup = true;
            } else {
                onLogout();
                setup = true;
            }
        });
        self.auth.on('login', onLogin);
        self.auth.on('logout', onLogout);
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
    callback = callback || function () {};

    var putItem = JSON.stringify(self.data.session);
    localForage.setItem(self._sessionKey, putItem, callback);
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
        self._dirty = true;
        self.save(function onSave(err) {
            self._logger('observe.onSave', err || 'successful');
        });
    }, 10);
};

var model;
function instantiateModel (options) {
    // If the instance doesn't exist, create it.
    if (!model) model = new Model(options);
    return model;
}

module.exports = instantiateModel;

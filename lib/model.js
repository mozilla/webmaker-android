/**
 * Data model provider.
 *
 * @package webmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var Firebase = require('firebase');
var watch = require('watchjs').watch;
var config = require('../config');
var firebaseUrl = 'https://webmaker-app-dev.firebaseio.com'; // todo: config
var page = require('page');
var restorePath = require('./restore-path');

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
    self._ready = false;
    self._logger = function (prefix, msg) {
        if (typeof msg === 'undefined') {
            msg = prefix;
            prefix = 'Model';
        }

        if (msg) console.log('[' + prefix + '] ' + msg);
    };

    // Public
    self.firebase = new Firebase(firebaseUrl + '/apps');

    self.data = {};
    self.data.history = {
        ftu: true,
        path: '/sign-in',
    };
    self.data.locale = null;
    self.data.user = {};
    self.data.apps = [];
    self.data.appsById = {};
    self.data.offline = false;

}

function restoreModel() {
    // Restore to model.data
    if (typeof file.history !== 'undefined') {
        self.data.history = file.history;
    }
    if (typeof file.apps !== 'undefined') {
        self.data.apps = file.apps;
    }
    if (typeof file.locale !== 'undefined') {
        self.data.locale = file.locale;
    }
    if (typeof file.offline !== 'undefined') {
        self.data.offline = file.offline;
    }
}

Model.prototype.restore = function (callback, vm) {
    var self = this;

    // Set offline callback
    self.offlineConnect = function () {
        self._logger('Starting in offline mode');
        self.data.user = {};

        self.data.offline = true;
        callback();
        restorePath({
            history: self.data.history && self.data.history.path,
            offline: self.data.offline
        });
    };


    self._logger('Data restored');
    self.observe();
    self._ready = true;

    // Were we in offline mode? If so, restore it.
    // Just read locally if no connect
    if (self.data.offline ||
    self.options.noConnect ||
    global.location.search.match('offline=true') ||
    config.OFFLINE) {
        self.offlineConnect();
    }
    if (self.options.noConnect) {
        return;
    }

    // Otherwise, let's set up a connection
    var syncTimeout = setTimeout(function() {
        self.offlineConnect();
    }, 10000);

    function onLogin(user) {
        self._logger('login');
        self.data.user = user;

        global.clearTimeout(syncTimeout);
        self.data.user = user;
        self.data.offline = false;

        // yeah i know ok
        function init() {
            function createTimeout() {
                return setTimeout(function () {
                    console.log('init!');
                    callback();
                }, 2000);
            }
            var t = createTimeout();
            self.firebase
                .orderByChild('userId')
                .equalTo(user.id)
                .on('child_added', function (snapshot) {
                    clearTimeout(t);
                    var data = snapshot.val();
                    data.id = snapshot.key();
                    self.data.apps.push(data);
                    self.data.appsById[data.id] = data;
                    t = createTimeout();
                });

        }
        if (user.firebaseToken) {
            self.firebase.authWithCustomToken(
                user.firebaseToken,
                function (err, authData) {
                    if (err) console.log('Firebase auth error', err);
                    console.log(authData);
                    init();
                }
            );
        } else {
            init();
        }


        restorePath({
            history: self.data.history && self.data.history.path,
            offline: self.data.offline
        });
    }

    function onLogout() {
        self._logger('logout');
        self.data.user = {};
        if (self.data.offline) return;

        self.firebase.unauth();

        callback();
        page('/sign-in');
    }

    self.auth = require('./auth')();
    self.auth.on('error', function (err) {
        if (err.cors === 'rejected') {
            global.clearTimeout(syncTimeout);
            self.offlineConnect();
        }
    });

    var setup = false;
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

    var putItem = JSON.stringify(self.data);
    // self._fs.writeFile(self._ns, putItem, function (item) {
    //     self._logger('Data saved');
    //     callback.call(self, null);
    // });
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

    watch(self.data.history, function (attr, action, data) {
        console.log('history', attr, action, data);
        self._dirty = true;
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

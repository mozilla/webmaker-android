/**
 * Analytics tracker object.
 *
 * @package webmaker
 * @author  Adam Lofting <adam@mozillafoundation.org>
 */

var xhr = require("xhr");
var localForage = require('localforage');
var clone = require('clone');

var model = require('./model')();
var utils = require('./utils');
var network = require('./network');

var _config = require('../config');
var config = clone(_config);
var packageJSON = clone(config.package);
delete config.package;

var preQueue = [];
var localForageLocked = false;
var onHoldUntil = null;

// Declaring three functions that call each other recursively
// Otherwise JShint gets upset about impossible ordering
var processNext;
var processPreQueue;
var processNextInOfflineQueue;

/**
 * A note on offline mode and monitoring connectivity:
 *
 * If the app is 'installed', and wrapped with Cordova,
 * we use the network util to check for connectivity.
 *
 * But, if the app is being used in a browser, we use
 * failed calls to GA API to indicate the user is likely
 * offline (or less likely that GA API is down).
 *
 * In this case we 'hold' attempts to ping GA for a few
 * minutes after each fail, before checking again.
 *
 * In either case, if we can't ping GA, we store the hits
 * in a local queue to process when we have connectivity
 * later.
 */

/**
 * Utils for logging
 */

function _warn (message) {
    console.warn('[Error using analytics.js]', message);
}

function _log (message) {
    if (config.ANALYTICS_CONSOLE_LOGGING) {
        console.log('[analytics.js]', message);
    }
}

/**
 * Utils for putting analytics on hold for a fixed time
 */

function isAnalyticsOnHold () {
    if (!onHoldUntil) {
        return false;
    }

    // otherwise, we have set a holdUntil time
    var now = new Date();
    if (onHoldUntil > now) {
        // we are holding off sending updates
        return true;
    } else {
        // reset this
        onHoldUntil = null;
        return false;
    }
}

function setAnalyticsOnHold (mins) {
    mins = mins || 3;
    var onHoldAlready = isAnalyticsOnHold();
    if (onHoldAlready) {
        // we don't want to keep setting this, or we'll never
        // see when we have reconnected
        return;
    }

    var d = new Date();
    d.setUTCMinutes(d.getUTCMinutes() + mins);
    onHoldUntil = d;
    _log('Analytics on hold until ' + d);
}

function removeAnalyticsHold () {
    onHoldUntil = null;
}

/**
 * Check if this install has a cordova wrapper with
 * connectivity awareness. If it does, listen for
 * network events
 */
if (network.connection) {
    _log('Cordova app with network awareness');

    network.on('online', function () {
        removeAnalyticsHold();
        processNext();
    });

    network.on('offline', function () {
        setAnalyticsOnHold(30);
    });
}


/**
 * Functions for building the requests, and sending them to GA
 */

var commonAppValues = {};
function getCommonAppValues () {
    if (commonAppValues.v) {
        return commonAppValues;
    }

    commonAppValues = {
        // Required
        v: 1,                               // MP Version
        tid : config.GA_TRACKING_ID,        // Tracking ID / Property ID.
        cid : model.data.session.guestId,   // Anonymous Client ID.

        // Additional values we want to use for App Specific measurement
        an : packageJSON.name,              // Application Name
        //aid : '',                         // Application ID
        av : packageJSON.version,           // Application Version
        //aiid : '',                        // Application Installer ID
        ds: 'app',                          // Data Source
        ul: model.data.session.locale.toLowerCase(),     // User Language
        ua: navigator.userAgent             // User Agent
    };
    return commonAppValues;
}

function checkIfHitWasOffline (hit) {
    if (hit.originalRequestTime) {
        // we're retrying an earlier request that failed
        // The value Queue Time (qt) represents the time delta (in milliseconds)
        // between when the hit being reported occurred and the time the hit was
        // sent.
        var now = new Date();
        var qt = now.getTime() - hit.originalRequestTime.getTime();
        hit.qt = qt;
        // use a custom dimension to note this was recorded while offline
        hit.cd1 = 'offline';
        return true;
    } else {
        hit.cd1 = 'online';
        return false;
    }
}

function attemptSendToGA (hit, callback) {
    var wasOffline = checkIfHitWasOffline(hit);
    var gaObj = utils.simpleObjectMerge(getCommonAppValues(), hit);
    var connectionText = (wasOffline) ? 'Offline' : 'Live';

    if (wasOffline) {
        // this value doens't need to go to GA
        delete gaObj.originalRequestTime;
    }

    // Convert obj to a string for POST request
    var gaBody = utils.toParameterString(gaObj);

    // Make a POST request to GA
    xhr({
        body: gaBody,
        uri: "https://ssl.google-analytics.com/collect",
        method: "POST"
    }, function (err, resp, body) {
        if (resp.statusCode === 200) {
            // we're got as far as GA (and must be online)
            _log('sent hit to GA', connectionText);
            return callback(true);
        }
        // Otherwise, something went wrong or we're offline
        //_log({err: err});
        return callback(false);
    });
}

/**
 * Functions for queuing offline hits, and processing those
 * queues when connectivity is available
 *
 * A note on queues: The offline queue is stored using the localForage
 * library, but because of the read/write time required to access the file
 * system we also have an in memory temporary preQueue where we push events
 * and then process them into the offline queue to avoid conflicts.
 */

function logQueueLength () {
    localForage.getItem('gaQueue', function (err, queue) {
        queue = queue || [];
        _log('Queue length: ' + queue.length);
    });
}

function lockLocalForage () {
    localForageLocked = true;
    //_log('Locked LocalForage');
}

function unlockLocalForage () {
    localForageLocked = false;
    //_log('Unlocked LocalForage');
}

function processNext () {
    processPreQueue();
    processNextInOfflineQueue(function () {});
}

function processPreQueue () {
    if (preQueue.length > 0) {
        if (localForageLocked) {
            return;
        }

        var processNow = clone(preQueue);
        preQueue = []; // reset so new values can be logged while we're
                        // processing this batch without causing a loop
        lockLocalForage();
        localForage.getItem('gaQueue', function (err, queue) {
            queue = queue || [];
            queue = queue.concat(processNow);

            localForage.setItem('gaQueue', queue, function (err, value) {
                unlockLocalForage();
                _log(processNow.length + ' hits saved for later processing');
                logQueueLength();
                processNext();
            });
        });
    }
}

function addToLocalQueue (hit) {
    // immediately push to an Array (preQueue) to avoid clashes if
    // localForage is reading and writing from/to the localQueue
    preQueue.push(hit);
    processPreQueue();
}

function processNextInOfflineQueue (callback) {
    var onHold = isAnalyticsOnHold();
    if (onHold) {
        // don't process yet
        return callback(false);
    }

    if (localForageLocked) {
        return callback(false);
    }

    lockLocalForage();
    localForage.getItem('gaQueue', function (err, queue) {
        queue = queue || [];
        if (queue.length === 0) {
            unlockLocalForage();
            return callback(true);
        }

        var hit = queue[0];
        attemptSendToGA(hit, function (success) {
            if (success) {
                // remove the item we've just sent to GA
                queue.splice(0, 1);
                // resave the queue (even if it's now empty)
                localForage.setItem('gaQueue', queue, function (err, value) {
                    unlockLocalForage();
                    logQueueLength();
                    processNext();
                });
            } else {
                unlockLocalForage();
                processNext();
                return callback(false);
            }
        });
    });
}

function recordNewHit (hit) {

    // skip GA attempt if we're on hold
    var isOnHold = isAnalyticsOnHold();
    if (isOnHold) {
        hit.originalRequestTime = new Date();
        addToLocalQueue(hit);
        return;
    }

    attemptSendToGA(hit, function (success) {
        if (success) {
            // This worked, and we're online
            // So we should see if there is a backlog queue to process
            processNextInOfflineQueue (function () {
                return;
            });
        } else {
            // We weren't able to send to GA at this time
            _log('Failed sending hit to GA');
            setAnalyticsOnHold();
            // store to try later
            hit.originalRequestTime = new Date();
            addToLocalQueue(hit);
        }
    });
}



/*
 * Exposed Funcitons
 */
module.exports = {

    /**
     * screenView
     * obj.screenName = 'Awesome Page Title'
     */
    screenView: function (obj) {
        if (!obj || !obj.screenName) {
            _warn('screenName is required in analytics.screenView()');
            return;
        }
        // Build the GA version
        var hit = {
            t: 'screenview',        // hit type
            cd: encodeURIComponent(obj.screenName)      // screen name
        };
        recordNewHit(hit);
    },

    /**
     * event
     * obj.category = 'UX'
     * obj.action = e.g. 'Opened Side Menu'
     * obj.label = 'Using swipe gesture' (Optional)
     */
    event: function (obj) {
        if (!obj ||
            !obj.category ||
            !obj.action) {
            _warn('category and action are required in analytics.event()');
            return;
        }

        // Build the GA version
        var hit = {
            t: 'event',             // hit type
            ec: encodeURIComponent(obj.category),       // event category
            ea: encodeURIComponent(obj.action)          // event action
        };

        if (obj.label) {
            hit.el = encodeURIComponent(obj.label);     // event label
        }
        recordNewHit(hit);
    },

    newSession: function () {
        // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#sc

        // We need to attach a newSession action to a hit,
        // so we fire an arbitrary non-interaction event.
        var hit = {
            t: 'event',             // hit type
            ni: 1,                  // Non-interaction event
            ec: 'Session Control',  // event category
            ea: 'New Session',      // event action
            sc: 'start'             // Session Control
        };

        recordNewHit(hit);
    },

    changeLocale: function () {
        // TODO: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ul
    },

    /**
     * timing
     * obj.category = e.g. 'Pageload'
     * obj.name = e.g. 'Homescreen'
     * obj.time = {Int} Time in milliseconds
     */
    userTiming: function (obj) {
        // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#utc
        if (!obj ||
            !obj.category ||
            !obj.name ||
            !obj.time) {
            _warn('category, name and time are required in analytics.timing()');
            return;
        }

        // Build the GA version
        var hit = {
            t: 'timing',                                    // hit type
            utc: encodeURIComponent(obj.category),          // User Timing Category
            utv: encodeURIComponent(obj.name),              // User Timing Variable Name
            utt: encodeURIComponent(obj.time)               // User Timing Time
        };
        recordNewHit(hit);
    },

    /**
     * error
     * obj.description = e.g. 'Error Sharing App'
     * obj.fatal = {Boolean} true if exception was fatal to the app
     */
    error: function (obj) {
        // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#exd
        if (!obj || !obj.description) {
            _warn('description is required in analytics.error()');
            return;
        }

        // Build the GA version
        var hit = {
            t: 'exception',                                 // hit type
            exd: encodeURIComponent(obj.description)        // Exception Description
        };

        if (obj.fatal) {
            hit.exf = 1;     // exception was fatal to app
        }
        recordNewHit(hit);
    }
};


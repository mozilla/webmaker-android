var util = require('util');
var events = require('events');

function Network () {
    var self = this;

    self.isOnline = true;
    self.connection = null;

    // Bypass if cordova API is not available
    if (typeof navigator === 'undefined') return;
    if (typeof navigator.connection === 'undefined') return;

    // Event handlers
    function onOffline () {
        self.isOnline = false;
        self.emit('offline');
    }

    function onOnline () {
        self.isOnline = true;
        self.emit('online');
    }

    // Bind event listeners
    document.addEventListener('offline', onOffline, false);
    document.addEventListener('online', onOnline, false);
    self.connection = navigator.connection.type;
}

util.inherits(Network, events.EventEmitter);

module.exports = new Network();

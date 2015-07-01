/**
 * Device agnostic platform interface.
 *
 * @package core
 * @author Andrew Sliwinski <a@mozillafoundation.org>
 */

var lru = require('lru-cache');

/**
 * Constructor
 */
function Platform () {
  // Check to see if window.Platform exists. If it does, return it.
  if (window.Platform) {
    return window.Platform;
  }

  // Init storage objects
  this.sharedStorage = window.localStorage;
  this.memStorage = lru(50);
  this.sessionKey = 'WEBMAKER_SESSION';
  this.cacheKey = '::' + window.pathname;
}

// -----------------------------------------------------------------------------
// Persistent storage
// -----------------------------------------------------------------------------

Platform.prototype.getSharedPreferences = function(key, global) {
  if (!global) {
    key += this.cacheKey;
  }
  return this.sharedStorage.getItem(key);
};

Platform.prototype.setSharedPreferences = function(key, value, global) {
  if (!global) {
    key += this.cacheKey;
  }
  return this.sharedStorage.setItem(key, value);
};

Platform.prototype.resetSharedPreferences = function() {
  return this.sharedStorage.clear();
};

// -----------------------------------------------------------------------------
// Session storage
// -----------------------------------------------------------------------------

Platform.prototype.getUserSession = function() {
  return this.getSharedPreferences(this.sessionKey);
};

Platform.prototype.setUserSession = function(data) {
  return this.setUserSession(this.sessionKey, data);
};

Platform.prototype.clearUserSession = function() {
  return this.setUserSession(this.sessionKey, null);
};

// -----------------------------------------------------------------------------
// Memory (LRU) storage
// -----------------------------------------------------------------------------

Platform.prototype.getMemStorage = function(key, global) {
  if (!global) {
    key += this.cacheKey;
  }
  return this.memStorage.get(key);
};

Platform.prototype.setMemStorage = function(key, value, global) {
  if (!global) {
    key += this.cacheKey;
  }
  return this.memStorage.set(key, value);
};

// -----------------------------------------------------------------------------
// Navigation
// -----------------------------------------------------------------------------

Platform.prototype.setView = function(uri) {
  window.location.href = uri;
};

Platform.prototype.openExternalUrl = function(uri) {
  window.location = uri;
};

Platform.prototype.goBack = function() {
  // @todo
};

Platform.prototype.goToHomeScreen = function() {
  // @todo
};

// -----------------------------------------------------------------------------
// Router
// -----------------------------------------------------------------------------

Platform.prototype.getRouteParams = function() {
  // @todo
};

Platform.prototype.getRouteData = function() {
  // @todo
};

Platform.prototype.clearRouteData = function() {
  // @todo
};

// -----------------------------------------------------------------------------
// Images
// -----------------------------------------------------------------------------

Platform.prototype.cameraIsAvailable = function() {
  // @todo
  return false;
};

Platform.prototype.getFromCamera = function() {
  // @todo
};

Platform.prototype.getFromMedia = function() {
  // @todo
};

// -----------------------------------------------------------------------------
// Sharing
// -----------------------------------------------------------------------------

Platform.prototype.shareProject = function() {
  // @todo
};

// -----------------------------------------------------------------------------
// Google Analytics
// -----------------------------------------------------------------------------

Platform.prototype.trackEvent = function(category, action, label, value) {
  if (!window.ga) {
    return;
  }

  window.ga('send', {
    'hitType': 'event',
    'eventCategory': category,
    'eventAction': action,
    'eventLabel': label,
    'eventValue': value
  });
};

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

Platform.prototype.isDebugBuild = function() {
  // @todo
  return false;
};


module.exports = new Platform();

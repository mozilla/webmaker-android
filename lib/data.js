var Firebase = require('firebase');
var config = require('../config');

/**
 * Generic logger for Firebase events
 *
 * @param  {string} msg    Error / confirmation message
 *
 * @return {void}
 */
function log(msg) {
  if (msg) {
    console.log('[Firebase] ' + msg);
  }
}

/**
 * Constructor
 */
function Data(appId) {
  var self = this;

  // Create firebase instance
  self.db = new Firebase(config.FIREBASE_URL_DATA + '/' + appId);

  // Authorize
  if (self.db.getAuth() === null) {
    self.db.authAnonymously(function (err) {
      if (err) {
        return log(err);
      }
      log('Authorized');
    });
  }
}

/**
 * Returns all data "rows".
 *
 * @param  {Function} callback
 *      {string} Error
 *      {array}  An array of results from Firebase
 *
 * @return {void}
 */
Data.prototype.fetch = function (callback) {
  var self = this;

  self.db.once('value', function (snapshot) {
    var result = [];
    snapshot.forEach(function (child) {
      result.push(child.val());
    });

    callback(null, result);
  });
};

/**
 * Creates ("push") a new record with the specified object.
 *
 * @param  {object}   blob     Dataset to be persisted
 * @param  {Function} callback
 *      {string} Error
 */
Data.prototype.save = function (blob, callback) {
  var self = this;

  self.db.push({
    submitted: Date.now(),
    dataBlocks: blob
  }, callback);
};

/**
 * Removes record with the specified object id.
 *
 * @param  {string}   id
 * @param  {Function} callback
 *      {string} Error
 */
Data.prototype.delete = function (id, callback) {
  this.db.child(id).remove(callback);
};

Data.prototype.collect = function (el, callback) {
  var dataset = [];
  var blocks = el.querySelector('.blocks').children;

  // Iterate over blocks & build up data set
  for (var i = 0; i < blocks.length; i++) {
    var label = blocks[i].querySelector('label');
    var input = blocks[i].querySelector('input');

    if (label !== null && input !== null) {
      dataset.push({
        label: label.innerText || label.textContent,
        value: input.value
      });
    }
  }

  // Save dataset
  this.save(dataset, callback);
};

module.exports = Data;

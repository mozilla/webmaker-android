var xhr = require('xhr');
var defaults = require('lodash.defaults');
var BASE_URL = 'https://webmaker-api.herokuapp.com';

var dispatcher = require('./dispatcher');

module.exports = function (options, callback) {
  // Set default options
  defaults(options, {
    spinOnLag: true,
    acceptableLag: 1000, // in MS
    method: 'GET',
    useCache: false,
    json: {},
    headers: {},
    timeout: 60000 // 60 seconds
  });

  // ensure user-supplied methods conform to what we need.
  options.method = options.method.toUpperCase();

  if (options.method === 'GET' && !callback) {
    // Signal an error, but don't throw, as that would crash the app:
    console.error('API request for stored data received without a callback handler to forward the data with.');
    console.trace();
    return;
  }

  // Use URI and prepend the API host
  if (typeof options.url !== 'undefined') {
    options.uri = options.url;
    delete options.url;
  }
  options.uri = BASE_URL + options.uri;

  // Use a fake token for now
  if (options.method !== 'GET') {
    options.headers.Authorization = 'token validToken';
  }

  // Set cache key
  var key = 'cache::' + options.method + '::' + options.uri;

  // Use device cache if window.Android is available & options.useCache is true
  if (window.Android && options.useCache === true && options.method === 'GET') {
    console.log('Fetching from cache "' + key + '"');
    var hit = window.Android.getMemStorage(key, true);
    if (typeof hit === 'string') {
      return callback(null, JSON.parse(hit));
    }
  }

  var lagTimer = setTimeout(() => {
    if (options.spinOnLag) {
      dispatcher.fire('apiLagging');
    }
  }, options.acceptableLag);

  // XHR request
  xhr(options, function (err, res, body) {
    clearTimeout(lagTimer);
    dispatcher.fire('apiCallFinished');

    if (err && callback) {
      return callback(err);
    }

    // Set cache if window.Android is available
    if (window.Android) {
      window.Android.setMemStorage(key, JSON.stringify(body), true);
    }

    // If there is a callback, forward the response body
    if (callback) {
      callback(false, body);
    }
  });
};

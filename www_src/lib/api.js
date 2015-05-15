var xhr = require('xhr');
//var xhr = require('./api-mock').getResponse;
var defaults = require('lodash.defaults');
var BASE_URL = 'https://webmaker-api.herokuapp.com';
// var BASE_URL = 'http://localhost:2015';
var mocks = require('./api-mock');

module.exports = function (options, callback) {
  // Set default options
  defaults(options, {
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
  if (window.Android && options.useCache === true) {
    window.Android.logText('Fetching from cache "' + key + '"');
    var hit = window.Android.getSharedPreferences(key, false);
    if (typeof hit === 'string') return callback(null, JSON.parse(hit));
  }

  // XHR request
  xhr(options, function (err, res, body) {
    if (err && callback) return callback(err);

    // Set cache if window.Android is available
    if (window.Android) {
      window.Android.setSharedPreferences(key, JSON.stringify(body), false);
    }

    // If there is a callback, forward the response body
    if(callback) {
      callback(null, body);
    }
  });
};

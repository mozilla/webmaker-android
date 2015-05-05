//var xhr = require('xhr');
var xhr = require('./api-mock').getResponse;
var defaults = require('lodash.defaults');
var BASE_URL = '';
var mocks = require('./api-mock');

module.exports = function (options, callback) {
  // Set default options
  defaults(options, {
    method: 'GET',
    useCache: false,
    json: {},
    timeout: 60000    // 60 seconds
  });

  // Use URI and prepend the API host
  if (typeof options.url !== 'undefined') {
    options.uri = options.url;
    delete options.url;
  }
  options.uri = BASE_URL + options.uri;

  // Set cache key
  var key = 'cache::' + options.method.toLowerCase() + '::' + options.uri;

  // Use device cache if window.Android is available & options.useCache is true
  if (window.Android && options.useCache === true) {
    window.Android.logText('Fetching from cache "' + key + '"');
    var hit = window.Android.getSharedPreferences(key);
    if (typeof hit === 'string') return callback(null, JSON.parse(hit));
  }

  // XHR request
  xhr(options, function (err, res, body) {
    if (err) return callback(err);

    // Set cache if window.Android is available
    if (window.Android) {
      window.Android.setSharedPreferences(key, JSON.stringify(body));
    }

    // Return response body
    callback(null, body);
  });
};

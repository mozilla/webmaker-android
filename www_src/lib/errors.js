var dispatcher = require('./dispatcher');
var debug = false;

var ErrorReporter = function() {
  var array = Array.prototype.slice.call(arguments);
  if (debug) {
    console.log.apply(console, arguments);
  }
  dispatcher.fire('reportError', {
    message: array[0],
    additionals: array.slice(1)
  });
};

module.exports = ErrorReporter;

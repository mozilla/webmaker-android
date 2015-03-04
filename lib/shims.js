// This is for phantomjs
// Polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    var errMsg = 'Function.prototype.bind - ' +
      'what is trying to be bound is not callable';
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new window.TypeError(errMsg);
    }

    var aArgs = Array.prototype.slice.call(arguments, 1);
    var self = this;
    var FNOP = function () {};
    var fBound = function () {
      return self.apply(this instanceof FNOP && oThis ? this : oThis,
        aArgs.concat(Array.prototype.slice.call(arguments)));
    };

    FNOP.prototype = this.prototype;
    fBound.prototype = new FNOP();

    return fBound;
  };
}

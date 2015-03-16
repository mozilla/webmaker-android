var UA = navigator.userAgent;

module.exports = {
  isFirefoxOS: UA.indexOf('Mobile') >= 0 &&
    UA.indexOf('Firefox') >= 0 &&
    UA.indexOf('Android') === -1
};

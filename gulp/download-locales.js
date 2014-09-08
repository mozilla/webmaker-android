var downloadLocales = require('webmaker-download-locales');

module.exports = function (callback) {
    downloadLocales('mobile-appmaker', 'locale', callback);
};

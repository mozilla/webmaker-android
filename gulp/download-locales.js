var downloadLocales = require('webmaker-download-locales');
var glob = require('glob');
var fs = require('fs-extra');

// Which languages should we pull down?
// Don't include en-US because that's committed into git already
var supportedLanguages = ['id', 'en_CA', 'es_CL', 'fr', 'nl', 'es_MX', 'cs', 'sv', 'bn_BD', 'sw', 'hi_IN'];

module.exports = function (callback) {
  glob('!./locale/!(en_US)/**.json', function (err, files) {
    files.forEach(function (file) {
      fs.removeSync(file);
    });
    downloadLocales({
      app: 'webmaker-app',
      dir: 'locale',
      languages: supportedLanguages
    }, callback);
  });
};

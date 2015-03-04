var fs = require('fs-extra');
var glob = require('glob');
var path = require('path');

module.exports = function (callback) {
  var langMap = Object.create(null);

  glob('./locale/**/webmaker-app.json', function (err, files) {
    if (err) {
      return callback(err);
    }

    files.forEach(function (filename) {
      filename = path.join(filename);

      var dirs = filename.split(path.sep);
      var code = dirs[dirs.length - 2].replace('_', '-');

      // Remove descriptions
      var temp = {};
      var raw = JSON.parse(fs.readFileSync(filename, 'utf-8'));
      Object.keys(raw).forEach(function (key) {
        temp[key] = raw[key].message;
      });

      // Add to map
      langMap[code] = temp;
    });

    var file = 'module.exports = ';
    file += JSON.stringify(langMap);
    file += ';';

    fs.writeFile('./locale/index.js', file, callback);
  });
};

var fs = require('fs-extra');
var glob = require('glob');
var gulp = require('gulp');

module.exports = function (callback) {
    fs.removeSync('./build');
    fs.mkdirsSync('build');
    fs.copySync('./static/.', './build/');

    glob('./{views,components,blocks}/**/*.less', function (err, files) {
        if (err) return callback(err);

        var file = '';
        for (var i in files) {
            file += "@import '" + files[i] + "'; \n";
        }
        fs.writeFile('./build/styles/bundle.less', file, callback);
    });
};

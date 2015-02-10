var fs = require('fs-extra');
var gulp = require('gulp');

module.exports = function (done) {
    fs.removeSync('./build');
    fs.mkdirsSync('build');
    fs.copySync('./static/.', './build/');
    fs.copySync('./node_modules/webmaker-app-icons/fonts/.', './build/fonts');
    done();
};

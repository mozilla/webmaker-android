var gulp = require('gulp');
var jspaths = require('./util/jspaths');
var jscs = require('gulp-jscs');

var fs = require('fs');
var config = fs.readFileSync('./node_modules/mofo-style/linters/.jscsrc', 'utf8');
config = JSON.parse(config);

module.exports = function () {
  return gulp.src(jspaths).pipe(jscs(config));
};

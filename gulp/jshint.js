var gulp = require('gulp');
var jspaths = require('./util/jspaths');
var jshint = require('gulp-jshint');

module.exports = function () {
  return gulp.src(jspaths)
    .pipe(jshint({
      lookup: './node_modules/mofo-style/linters/.jshintrc'
    }))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
};

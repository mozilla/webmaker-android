var gulp = require('gulp');
var jspaths = require('./util/jspaths');
var jsbeautify = require('gulp-jsbeautifier');

var beautifier = jsbeautify({
  config: './node_modules/mofo-style/linters/.jsbeautifyrc'
});

module.exports = function () {
  return gulp.src(jspaths, {
      base: './'
    })
    .pipe(beautifier)
    .pipe(gulp.dest('./'));
};

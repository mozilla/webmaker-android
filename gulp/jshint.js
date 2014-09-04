var gulp = require('gulp');
var jshint = require('gulp-jshint');

module.exports = function () {
    gulp.src('./{lib,blocks,components,views}/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
};

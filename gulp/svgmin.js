var gulp = require('gulp');
var svgmin = require('gulp-svgmin');

module.exports = function () {
    return gulp.src('./static/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./static/'));
};

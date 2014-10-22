var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');

module.exports = function() {
    var src = gulp.src('./build/styles/common.less');
    var dest = gulp.dest('./build/styles');
       src
    .pipe(plumber())
    .pipe(less()).pipe(dest).pipe(gulp.dest('./build/publish-assets'));
};

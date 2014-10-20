var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');

module.exports = function() {
    var src = gulp.src('./build/styles/common.less');
    var dest = gulp.dest('./build/styles');
<<<<<<< HEAD
       src
    .pipe(plumber())
    .pipe(less()).pipe(dest).pipe(gulp.dest('./build/publish-assets'));
=======

    src.pipe(less()).pipe(dest);
>>>>>>> eebbe46676390573b267bc2c985cacda25905711
};

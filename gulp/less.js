var gulp = require('gulp');
var less = require('gulp-less');

module.exports = function() {
    var src = gulp.src('./build/styles/common.less');
    var dest = gulp.dest('./build/styles');

    src.pipe(less()).pipe(dest);
};

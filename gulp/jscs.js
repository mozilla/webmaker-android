var gulp = require('gulp');
var jscs = require('gulp-jscs');

module.exports = function () {
    gulp.src('./{lib,blocks,components,views}/**/*.js')
        .pipe(jscs());
};

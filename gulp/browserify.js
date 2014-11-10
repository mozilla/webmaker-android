var gulp = require('gulp');
var browserify = require('gulp-browserify');
var handleErrors = require('./error');

module.exports = function () {
    var src = gulp.src('./lib/index.js');
    var dest = gulp.dest('./build');

    return src
        .pipe(handleErrors())
        .pipe(browserify({
            insertGlobals: false,
            transform: ['partialify', 'bulkify']
        }))
        .pipe(dest);
};

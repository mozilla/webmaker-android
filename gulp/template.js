var template = require('gulp-template');
var gulp = require('gulp');
var config = require('../config');

module.exports = function () {
    return gulp.src('./static/index.html')
        .pipe(template(config))
        .pipe(gulp.dest('./build'));

};

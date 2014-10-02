var gulp = require('gulp');
var browserify = require('gulp-browserify');
var fs = require('fs');
var file = require('gulp-file');

var templates = require('../lib/templates.json');
var json = templates[2];

module.exports = function () {
    var dest = './build/publish-assets';
    gulp.src('./publish/index.js')
        .pipe(browserify({
            insertGlobals: false,
            transform: ['partialify', 'bulkify']
        })).pipe(gulp.dest(dest));

    gulp.src('./publish/index.html')
        .pipe(gulp.dest(dest));

    // Just for example
    var string = 'window.App=' + JSON.stringify(json) + ';';
    file('app.js', string).pipe(gulp.dest(dest));

};

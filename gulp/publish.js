var gulp = require('gulp');

var file = require('./gulp-file');
var merge = require('merge-stream');

var templates = require('../lib/templates.json');
var json = templates[2];

module.exports = function () {
    var src = './publish/index.js';
    var dest = './build/publish-assets';

    var html = gulp.src('./publish/index.html')
        .pipe(gulp.dest(dest));

    // Just for example
    var string = 'window.App=' + JSON.stringify(json) + ';';
    var app = file('app.js', string).pipe(gulp.dest(dest));

    return merge(html, app);
};

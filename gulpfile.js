var gulp = require('gulp');

var clean = require('./gulp/clean');
var locale = require('./gulp/locale');
var browserify = require('./gulp/browserify');
var less = require('./gulp/less');
var cache = require('./gulp/cache');

var jshint = require('./gulp/jshint');
var jscs = require('./gulp/jscs');
var unit = require('./gulp/unit');

var server = require('./gulp/server');

// Build
gulp.task('clean', clean);
gulp.task('locale', locale);
gulp.task('browserify', ['clean', 'locale'], browserify);
gulp.task('less', ['browserify'], less);
gulp.task('cache', ['less'], cache);
gulp.task('build', ['cache']);

// Test
gulp.task('jshint', jshint);
gulp.task('jscs', jscs);
gulp.task('lint', ['jshint', 'jscs']);
gulp.task('unit', unit);
gulp.task('test', ['lint', 'unit']);

// Watch
gulp.task('watch', function () {
    gulp.watch('./{blocks,components,lib,static,views}/**/*.{js,json,less,html}', ['build']);
});

// Serve
gulp.task('server', server);

var gulp = require('gulp');
var run = require('gulp-run');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var handleErrors = require('./error');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function (done) {
    run('browserify ./lib/index.js -d -t [partialify bulkify] -o ./build/index.js').exec(done);
};

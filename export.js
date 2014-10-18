// For exporting publish assets via npm
var gulp = require('gulp');
var path = require('path');

var buildDir = __dirname + '/build/';

function handleError(stream, cb) {
    stream.on('end', function() {
        cb(null);
    });
    stream.on('error', function (err) {
        cb(err);
    });
}

module.exports = {
    copySharedAssets: function (dest, cb) {
        var dirs = ['content/**/*', 'fonts/**/*', 'images/**/*', 'styles/**/*.css']
        var s = gulp.src(dirs.map(function (dir) {
            return buildDir + dir;
        }), {base: buildDir}).pipe(gulp.dest(dest));
        handleError(s, cb);
    },
    copyPublishAssets: function (dest, cb) {
        var s = gulp.src([
            buildDir + 'publish-assets/**/*',
            // Exclude sample app.js
            '!' + buildDir + 'publish-assets/app.js'
        ]).pipe(gulp.dest(dest));
        handleError(s, cb);
    }
};

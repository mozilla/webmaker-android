// For exporting publish assets via npm
var gulp = require('gulp');
var path = require('path');

module.exports = {
    copyPublishAssets: function (dest) {
        gulp.src(path.join(__dirname, './build/publish-assets/**/*'))
            .pipe(gulp.dest(dest));
    }
};

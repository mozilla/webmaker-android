var gutil = require('gulp-util');
var plumber = require('gulp-plumber');

function onError(err) {
    gutil.log(gutil.colors.red(err));
    gutil.beep();
    this.emit('end');
}

function PlumberError() {
    return plumber({
        errorHandler: onError
    });
};

PlumberError.onError = onError;

module.exports = PlumberError;

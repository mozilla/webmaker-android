var exec = require('child_process').exec;
var gutil = require('gulp-util');

function browserify(src, dest, options) {
    var task = options.watch ? 'watchify' : 'browserify';
    var sourceMaps = options.sourceMaps ? ' -d' : '';

    return task + ' ' + src + sourceMaps + ' -t partialify -t bulkify -o ' + dest;
}

module.exports = function (src, dest, options) {
    return function (done) {
        options = options || {};
        exec(browserify(src, dest, options), function (err, stdout, stderr) {
            if (err) {
                var err = new gutil.PluginError('watchify', err);
            }
            gutil.log(stdout);
            gutil.log(stderr);
            if (!options.watch) done();
        });
        if (options.watch) done();
    }
}

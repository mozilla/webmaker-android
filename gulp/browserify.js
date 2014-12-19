var run = require('gulp-run');
var async = require('async');
 
function browserify(src, dest) {
    return 'browserify ' + src + ' -d -t partialify -t bulkify ' +
        ' | exorcist ' + dest + '.map > ' + dest;
}

module.exports = function (src, dest) {
    return function (done) {
        run(browserify(src, dest)).exec(done);
    }
}

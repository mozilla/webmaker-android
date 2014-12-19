var run = require('gulp-run');
 
function browserify(src, dest) {
    return 'browserify ' + src + ' -d -t partialify -t bulkify ' +
        ' | exorcist ' + dest + '.map > ' + dest;
}


module.exports = function (done) {
    run(browserify('./lib/index.js', './build/index.js')).exec(done);
};

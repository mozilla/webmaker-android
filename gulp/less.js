var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var glob = require('glob');
var handleErrors = require('./error');
var path = require('path');
var fs = require('fs-extra');

var SRC_FILE = './styles/common.less';
var DEST_DIR = './build/styles';
var PUBLISH_DIR = './build/publish-assets';

function bundleLess() {
  var files = glob.sync('./{views,components,blocks}/**/*.less');
  var fileString = files.map(function (file) {
    return '@import \'' + file + '\';';
  }).concat([]).join('\n');
  fs.writeFileSync(path.join(DEST_DIR, 'bundle.less'), fileString);
}

module.exports = function () {
  fs.removeSync(DEST_DIR);
  fs.ensureDirSync(DEST_DIR);

  bundleLess();

  return gulp.src(SRC_FILE)
    .pipe(handleErrors())
    .pipe(sourcemaps.init())
    .pipe(less())
    // .pipe(minifyCSS({keepBreaks:false}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'android >= 4.2'],
      cascade: false,
      remove: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST_DIR))
    .pipe(gulp.dest(PUBLISH_DIR));
};

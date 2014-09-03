var gulp = require('gulp');
var shell = require('gulp-shell');

module.exports = shell.task([
    'rm -rf ./build',
    'mkdir -p build',
    'cp -a ./static/. ./build/',
    'cat `find ./views -name "*.less"` > ./build/styles/views.less',
    'cat `find ./components -name "*.less"` > ./build/styles/components.less',
    'cat `find ./blocks -name "*.less"` > ./build/styles/blocks.less'
]);

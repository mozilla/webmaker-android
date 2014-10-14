var habitat = require('habitat');
var file = require('gulp-file');
var gulp = require('gulp');
var path = require('path');
var env = new habitat('publish');

// Which env variables can we expose to the client?
var expose = [
    'LOGIN_URL',
    'PUBLISH_ENDPOINT',
    'MAKEDRIVE_URL'
];

habitat.load('.env');
habitat.load('./config/defaults.env');

var keys = Object.keys(process.env);
var all = {};

// We can't use habitat.all because of this bug
// https://github.com/brianloveswords/habitat/issues/13
keys.forEach(function (key) {
    if (expose.indexOf(key) > -1) all[key] = habitat.get(key);
});

module.exports = function () {
    var string = 'module.exports = ' + JSON.stringify(all) + ';';
    file('index.js', string)
        .pipe(gulp.dest('./config'));
};


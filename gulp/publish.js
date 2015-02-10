var gulp = require('gulp');

var templates = require('../lib/templates.json');
var json = templates[2];

var fs = require('fs-extra');
var path = require('path');

module.exports = function (done) {
    var src = './publish/index.js';
    var dest = './build/publish-assets';

    fs.ensureDirSync(dest);

    // Copy HTML
    fs.copySync('./publish/index.html', path.join(dest, 'index.html'));

    // Just for example
    var string = 'window.App=' + JSON.stringify(json) + ';';
    fs.writeFileSync(path.join(dest, 'app.js'));

    done();
};

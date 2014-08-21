#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var Stream = require('stream')

function run() {
    var langMap = {};
    var args = process.argv.splice(2);
    var dir = args[0];
    // I should probably redo this as transformable streams later but oh well
    fs.readdirSync(dir).forEach(function (filename) {
        if (path.extname(filename) !== '.json' ) return;
        var code = path.basename(filename, '.json');

        // Remove descriptions
        var json = {};
        var raw = JSON.parse(fs.readFileSync(path.join(dir, filename), 'utf-8'));
        for (var key in raw) {
            json[key] = raw[key].message;
        }
        langMap[code] = json;
    });
    var stream = new Stream();
    stream.pipe = function(dest) {
        dest.write('module.exports = ');
        dest.write(JSON.stringify(langMap));
        dest.write(';');
    }
    stream.pipe(process.stdout);
}

run();

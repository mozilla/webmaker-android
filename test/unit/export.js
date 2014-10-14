var os = require('os');
var fs = require('fs-extra');
var path = require('path');
var assert = require('assert');

var exportjs = require('../../export');

var tmpDir = path.join(os.tmpdir(), '_webmaker_app_temp_export_');

describe('export.js', function () {

    afterEach(function () {
        fs.removeSync(tmpDir);
    });

    it('should copy shared assets', function (done) {
        exportjs.copySharedAssets(tmpDir, function (err) {
            if (err) throw err;
            var files = fs.readdirSync(tmpDir);
            try {
                assert.ok(files.indexOf('content') > -1);
                assert(files.indexOf('fonts') > -1);
                assert(files.indexOf('images') > -1);
                assert(files.indexOf('styles') > -1);
            } catch(err) {
                return done(err);
            }
            done();
        });
    });
    it('should copy publish assets', function (done) {
        exportjs.copyPublishAssets(tmpDir, function (err) {
            if (err) throw err;
            var files = fs.readdirSync(tmpDir);
            try {
                assert(files.indexOf('index.html') > -1);
                assert(files.indexOf('index.js') > -1);
                assert(files.indexOf('app.js') === -1);
            } catch(err) {
                return done(err);
            }
            done();
        });
    })
});

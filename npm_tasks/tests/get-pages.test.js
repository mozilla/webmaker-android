var getPages = require('../get-pages');
var fs = require('fs-extra');
var path = require('path');
var should = require('should');
var tmp = require('tmp');
tmp.setGracefulCleanup();

function outputFakeFile(baseDir, name) {
  var f = fs.outputFileSync(path.join(baseDir, name), 'fake stuff 123\n');
}

describe('getPages', function () {
  var fakeDir;
  beforeEach(function () {
    fakeDir = tmp.dirSync().name;
  });
  it('should read the path directory in alpha order', function () {
    outputFakeFile(fakeDir, 'foo/foo.jsx');
    outputFakeFile(fakeDir, 'bar/bar.jsx');
    outputFakeFile(fakeDir, 'baz/baz.jsx');
    should.deepEqual(getPages(fakeDir), ['bar', 'baz', 'foo']);
  });
  it('should skip directories without properly formatted jsx files', function () {
    outputFakeFile(fakeDir, 'foo/foo.jsx');
    outputFakeFile(fakeDir, 'bar/bar.js');
    outputFakeFile(fakeDir, 'baz/index.jsx');
    fs.mkdir(path.join(fakeDir, 'qux'));
    should.deepEqual(getPages(fakeDir), ['foo']);
  });
  it('should return an empty array for an empty dir', function () {
    should.deepEqual(getPages(fakeDir), []);
  });
});

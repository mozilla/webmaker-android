var fs = require('fs-extra');
var should = require('should');
var path = require('path');
var tmp = require('tmp');
var proxyquire = require('proxyquire');

var fakePages= ['bar', 'baz', 'foo'];
var fakeTemplate = '<script>{{ js_src }}</script>\n';

var buildHtml = proxyquire('../build-html', {
  './get-pages': function () {
    return fakePages;
  }
});

tmp.setGracefulCleanup();

describe('build-html (js)', function () {
  var fakeDir;
  beforeEach(function () {
    fakeDir = tmp.dirSync().name;
    buildHtml({
      baseDir: fakeDir,
      template: fakeTemplate
    });
  });
  it('should create directories in the base dir', function () {
    should.deepEqual(fs.readdirSync(fakeDir), fakePages);
  });

  fakePages.forEach(function (page) {
    it('should create an index.html for ' + page, function () {
      var filePath = path.join(fakeDir, page, 'index.html');
      should(fs.existsSync(filePath)).be.equal(true);
    });
    it('should contain the text ' + page + '.bundle.js', function () {
      var filePath = path.join(fakeDir, page, 'index.html');
      var output = fs.readFileSync(filePath, {encoding: 'utf-8'});
      should(output.match(page + '.bundle.js')).be.ok;
    });
  });
});

var fs = require('fs-extra');
var BASE_ASSETS_DIR = './app/src/main/assets/www/pages/';
var PAGES_DIR = './www_src/pages/';
var HTML_FILE = './www_src/html/index.html';

fs.readdirSync(PAGES_DIR).forEach(function (page) {
  var html = fs.readFileSync(HTML_FILE, {encoding: 'utf-8'});
  html = html.replace('{{ js_src }}', '../../js/' + page + '.bundle.js');
  fs.outputFile(BASE_ASSETS_DIR + page + '/index.html', html);
});


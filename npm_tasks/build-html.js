var fs = require('fs-extra');
var BASE_ASSETS_DIR = './app/src/main/assets/www/pages/';
var HTML_FILE = './www_src/html/index.html';
var getPages = require('./get-pages');

var html = fs.readFileSync(HTML_FILE, {encoding: 'utf-8'});

getPages().forEach(function (page) {
  html = html.replace('{{ js_src }}', '../../js/' + page + '.bundle.js');
  fs.outputFile(BASE_ASSETS_DIR + page + '/index.html', html);
});

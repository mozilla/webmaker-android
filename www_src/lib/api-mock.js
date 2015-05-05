var UrlPattern = require('url-pattern');
var assign = require('react/lib/Object.assign');
var uuid = require('./uuid');
var pages = require('./api-fake-data');

// Set cache if window.Android is available
if (window.Android) {
  var hit = window.Android.getSharedPreferences('fakePages');
  if (hit) pages = JSON.parse(hit);
}

function pagesAsArray() {
  var arr = Object.keys(pages).map(key => pages[key]);
  return JSON.parse((JSON.stringify(arr)));
};


function getResponse(options, cb) {
  var uri = options.uri;
  var method = options.method.toLowerCase();

  if (new UrlPattern('/users/:user/projects/:project/pages').match(uri)) {

    // get all pages
    if (method === 'get') {
      cb(null, {}, pagesAsArray());
    }

    // create page
    else if (method === 'post') {
      var newPage = JSON.parse(JSON.stringify(options.json));
      newPage.id = uuid();
      pages[newPage.id] = newPage;
      cb(null, {}, JSON.parse(JSON.stringify(newPage)));
    }
  }

  else if (new UrlPattern('/users/:user/projects/:project/pages/:page').match(uri)) {
    var id = new UrlPattern('/users/:user/projects/:project/pages/:page').match(uri).page;

    // get page
    if (method === 'get') {
      cb(null, {}, JSON.parse(JSON.stringify(pages[id])));
    }

    // update page
    else if (method === 'put') {
      pages[id] = object.assign({}, pages[id], options.json);
      cb(null, {}, JSON.parse(JSON.stringify(pages[id])));
    }

    // delete page
    else if (method === 'delete') {
      delete pages[id];
      cb(null, {});
    }
  }

  else {
    cb(new Error('That uri does not exist'));
  }

  // Update Android
  if (window.Android && ['put', 'post', 'delete'].indexOf(method) > -1) {
    window.Android.setSharedPreferences('fakePages', JSON.stringify(pages));
  }

}

module.exports = {
  pages,
  getResponse
}

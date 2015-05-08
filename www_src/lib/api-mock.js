var UrlPattern = require('./url-pattern');
var assign = require('react/lib/Object.assign');
var uuid = require('./uuid');
var pages = require('./api-fake-data');

// Set cache if window.Android is available
if (window.Android) {
  var hit = window.Android.getSharedPreferences('mock::pages', false);
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
      var data = pages[id] ? JSON.parse(JSON.stringify(pages[id])) : null;
      cb(null, {}, data);
    }

    // update page
    else if (method === 'put') {
      if (!pages[id]) {
        cb(new Error('Page with id ' + id + ' does not exist'));
      } else {
        pages[id] = assign({}, pages[id], options.json);
        cb(null, {}, JSON.parse(JSON.stringify(pages[id])));
      }
    }

    // delete page
    else if (method === 'delete') {
      delete pages[id];
      cb(null, {});
    }
  }

  else if (new UrlPattern('/users/:user/projects/:project/pages/:page/elements/:element').match(uri)) {
    var params = new UrlPattern('/users/:user/projects/:project/pages/:page/elements/:element').match(uri);
    var page = pages[params.page];

    if (!page) {
      cb(new Error('Page with id ' + params.page + ' does not exist'));
    }
    else if (!page.elements) {
      cb(new Error('Element with id ' + params.element + ' does not exist'));
    }

    else {

      var elements = page.elements;
      var element;
      var index;

      // find element first
      elements.forEach((el, i) => {
        if (el.id === params.element) {
          element = el;
          index = i;
        }
      });

      // get element
      if (method === 'get') {
        cb(null, {}, (element ? JSON.parse(JSON.stringify(element)) : null));
      }

      // update element
      else if (method === 'put') {
        elements[index] = assign({}, element, options.json);
        cb(null, {}, JSON.parse(JSON.stringify(elements[index])));
      }

    }
  }

  else {
    cb(new Error('That uri does not exist'));
  }

  // Update Android
  if (window.Android && ['put', 'post', 'delete'].indexOf(method) > -1) {
    window.Android.setSharedPreferences('mock::pages', JSON.stringify(pages), false);
  }

}

module.exports = {
  pages,
  getResponse
}

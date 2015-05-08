var React = require('react/addons');
var render = require('../../lib/render.jsx');
var router = require('../../lib/router.jsx');

var editors = {
  image: require('./image-editor.jsx'),
  link: require('./link-editor.jsx'),
  text: require('./text-editor.jsx')
};

var Editor;
var params = router.getRouteParams();

if (params.editor) {
  Editor = editors[params.editor];
} else if (window.location.hash) {
  Editor = editors[window.location.hash.replace('#', '')];
}

render(Editor || editors.text);

var React = require('react/addons');
var render = require('../../lib/render.jsx');

var Router = require('../../lib/router.js');

var editors = {
  image: require('./image-editor.jsx'),
  link: require('./link-editor.jsx'),
  text: require('./text-editor.jsx')
};

var Element = React.createClass({
  mixins: [Router],
  render: function () {
    var params = this.getRouteParams();
    var Editor = (params.editor && editors[params.editor]) || (window.hash && editors[window.hash.replace('#', '')]) || editors['text'];
    console.log(Editor);
    return Editor;
  }
});

render(Element);

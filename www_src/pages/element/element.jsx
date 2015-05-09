var React = require('react/addons');
var render = require('../../lib/render.jsx');
var router = require('../../lib/router.jsx');
var api = require('../../lib/api.js');

var editors = {
  image: require('./image-editor.jsx'),
  link: require('./link-editor.jsx'),
  text: require('./text-editor.jsx')
};

var hash = window.location.hash && window.location.hash.replace('#', '');
var fakeParams = {project: '123', page: 'foo0', element: 'bar' + hash};

render(React.createClass({
  mixins: [router],
  uri: function () {
    var params = this.state.params
    // for testing
    if (!params.element) params = fakeParams;
    return `/users/foo/projects/${params.project}/pages/${params.page}/elements/${params.element}`;
  },
  componentWillMount: function() {
    api({uri: this.uri()}, (err, data) => {
      this.setState({element: data});
    });
  },
  save: function (json) {
    api({method: 'put', uri: this.uri(), json}, (err, data) => {
      if (data) console.log('saved!');
    });
  },
  render: function () {
    var Editor;
    var {params, element} = this.state;

    if (typeof element === 'undefined') return (<div>Loading...</div>);

    Editor = editors[params.editor] || editors[hash] || editors.text;

    var props = {params, save: this.save};
    if (element) props.element = element;

    return (<Editor {...props} />);
  }
}));

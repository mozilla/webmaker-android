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

render(React.createClass({
  mixins: [router],
  uri: function () {
    var params = this.state.params;
    var element = params.element;
    if (hash) {
      switch(hash) {
        case 'image':
          element = 1;
          break;
        case 'text':
          element = 2;
          break;
        case 'link':
          element = 3;
          break;
        default:
          element = 2;
      }
    }
    return `/users/1/projects/${params.project}/pages/${params.page}/elements/${element}`;
  },
  componentWillMount: function() {
    this.load();
  },
  save: function (json) {
    // api({method: 'put', uri: this.uri(), json}, (err, data) => {
    //   if (data) console.log('saved!');
    // });
  },
  load: function () {
    api({uri: this.uri()}, (err, data) => {
      if (err) return console.error('Error loading element', err);
      if (!data || !data.element) return console.log('No element found');
      this.setState({element: data.element});
    });
  },
  render: function () {
    var Editor;
    var {params, element} = this.state;

    if (typeof element === 'undefined') return (<div>Loading...</div>);

    Editor = editors[params.editor] || editors[hash] || editors.link;

    var props = {params, save: this.save};
    if (element) props.element = element;

    return (<Editor {...props} />);
  }
}));

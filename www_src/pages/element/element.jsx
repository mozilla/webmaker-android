var React = require('react/addons');
var render = require('../../lib/render.jsx');
var router = require('../../lib/router.jsx');
var api = require('../../lib/api.js');

var editors = {
  image: require('./image-editor.jsx'),
  link: require('./link-editor.jsx'),
  text: require('./text-editor.jsx')
};

var blocks = require('../../blocks/all.jsx');

var hash = window.location.hash && window.location.hash.replace('#', '');
var testIds = {
  image: 1,
  text: 2,
  link: 3
};

render(React.createClass({
  mixins: [router],
  uri: function () {
    var params = this.state.params;
    var element = params.element;
    if (hash) element = testIds[hash];
    return `/users/1/projects/${params.project}/pages/${params.page}/elements/${element}`;
  },

  componentWillMount: function() {
    this.load();
  },
  componentDidUpdate: function (prevProps) {
    // resume
    if (this.props.isVisible && !prevProps.isVisible) {
      this.load();
    }
    // pause - if there are edits
    if (this.edits && !this.props.isVisible && prevProps.isVisible) {
      this.save();
    }
  },
  cacheEdits: function (edits) {
    this.edits = edits;
  },
  save: function () {
    var edits = this.edits;
    var json = blocks[edits.type].spec.expand(edits);
    api({method: 'patch', uri: this.uri(), json: {
      styles: json.styles,
      attributes: json.attributes
    }}, (err, data) => {
      if (err) console.error('There was an error updating the element', err);
      this.setState({
        elements: edits
      });
      this.edits = false;
    });
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

    var props = {params, cacheEdits: this.cacheEdits};
    if (element) props.element = element;

    return (<Editor {...props} />);
  }
}));

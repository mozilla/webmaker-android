var React = require('react');
var utils = require('../lib/propUtils');
var assign = require('react/lib/Object.assign');

var Text = React.createClass({
  statics: {
    defaults: {
      fontSize: 18,
      fontFamily: 'Roboto',
      color: '#645839',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAlign: 'center',
      whiteSpace: 'pre',
      innerHTML: 'Hello world'
    }
  },
  mixins: [
    require('./textedit')
  ],
  getDefaultProps: function () {
    return this.defaults;
  },
  render: function() {
    var style = {};
    var props = this.props;
    ['fontFamily', 'color', 'fontWeight', 'fontStyle', 'textDecoration', 'textAlign', 'whiteSpace']
      .forEach(prop => style[prop] = props[prop]);

    if (props.position) {
      style = assign(style, utils.propsToPosition(props));
    }

    var content = this.makeEditable(props.innerHTML, style);
    var onPClick = this.activate;
    if (this.state.editing) {
      onPClick = false;
    }
    return <p ref="dims" style={style} onClick={onPClick}>{content}</p>;
  }
});

module.exports = Text;

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
      innerHTML: 'Hello world'
    }
  },

  getDefaultProps: function () {
    return this.defaults;
  },

  render: function() {
    var style = {};
    var props = this.props;
    ['fontFamily', 'color', 'fontWeight', 'fontStyle', 'textDecoration', 'textAlign']
      .forEach(prop => style[prop] = props[prop]);

    if (props.position) {
      style = assign(style, utils.propsToPosition(props));
    }

    return <p style={style}>{props.innerHTML}</p>;
  }
});

module.exports = Text;

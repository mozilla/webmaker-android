var React = require('react');

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
    ['fontSize', 'fontFamily', 'color', 'fontWeight', 'fontStyle', 'textDecoration', 'textAlign'].forEach(prop => style[prop] = this.props[prop]);
    return <p style={style}>{this.props.innerHTML}</p>;
  }
});

module.exports = Text;

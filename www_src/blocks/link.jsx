var React = require('react');
var assign = require('react/lib/Object.assign');
var utils = require('../lib/propUtils');
var getContrastingColor = require('../lib/color').getContrastingColor;

var Link = React.createClass({
  statics: {
    defaults: {
      href: '',
      borderRadius: 5,
      backgroundColor: '#69A0FC',
      fontFamily: 'Roboto',
      innerHTML: 'Tap me',
      active: false
    }
  },
  getDefaultProps: function () {
    return this.defaults;
  },
  render: function() {
    var props = this.props;
    var style = {
      boxShadow: 'none',
      borderRadius: props.borderRadius,
      backgroundColor: props.backgroundColor,
      color: getContrastingColor(props.backgroundColor),
      fontFamily: props.fontFamily
    };

    if (props.position) {
      style = assign(style, utils.propsToPosition(props));
    }

    var Element = this.props.active ? 'a' : 'span';

    return <Element className="btn" style={style} href={props.href}>{props.innerHTML}</Element>
  }
});

module.exports = Link;

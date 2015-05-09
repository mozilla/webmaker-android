var React = require('react');
var assign = require('react/lib/Object.assign');
var utils = require('../lib/propUtils');
var getContrastingColor = require('../lib/color').getContrastingColor;

var Link = React.createClass({
  getDefaultProps: function () {
    return {
      href: '',
      active: false,
      borderRadius: 5,
      backgroundColor: '#69A0FC',
      fontFamily: 'Roboto',
      innerHTML: 'Tap me'
    };
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

    return <a className="btn" style={style} href={props.active && props.href}>{props.innerHTML}</a>
  }
});

module.exports = Link;

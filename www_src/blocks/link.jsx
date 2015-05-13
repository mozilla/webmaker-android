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
      whiteSpace: 'pre',
      innerHTML: 'Tap me',
      active: false
    }
  },
  mixins: [
    require('./textedit')
  ],
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
      fontFamily: props.fontFamily,
      whiteSpace: props.whiteSpace
    };

    if (props.position) {
      style = assign(style, utils.propsToPosition(props));
    }

    var Element = this.props.activelink ? 'a' : 'span';
    var content = this.makeEditable(props.innerHTML, style);
    var onPClick = this.activate;
    if (this.state.editing) {
      onPClick = false;
    }

    return <Element className="btn" style={style} onClick={onPClick} href={props.href}>{content}</Element>;
  }
});

module.exports = Link;

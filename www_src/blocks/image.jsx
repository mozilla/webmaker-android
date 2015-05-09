var React = require('react');
var utils = require('../lib/propUtils');
var assign = require('react/lib/Object.assign');

var Image = React.createClass({
  statics: {
    defaults: {
      src: '',
      alt: '',
      opacity: 1,
      borderWidth: 0,
      borderColor: 'transparent'
    }
  },
  getDefaultProps: function () {
    return this.defaults;
  },
  render: function() {
    var props = this.props;
    var style = {
      opacity: props.opacity,
      borderStyle: 'solid',
      borderWidth: props.borderWidth,
      borderColor: props.borderColor
    };

    if (props.position) {
      style = assign(style, utils.propsToPosition(props));
    }

    return <img style={style} src={this.props.src} alt={this.props.alt} />
  }
});

module.exports = Image;

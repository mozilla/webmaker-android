"use strict";

var React = require("react");

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
    console.log(this.props);
    var style = {
      opacity: this.props.opacity,
      borderStyle: 'solid',
      borderWidth: this.props.borderWidth,
      borderColor: this.props.borderColor
    };
    return <img style={style} src={this.props.src} alt={this.props.alt} />
  }
});

module.exports = Image;

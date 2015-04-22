"use strict";

var React = require("react");

var Header = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.value || ""
    };
  },

  render: function() {
    return <p>{this.state.value}</p>;
  }
});

module.exports = Header;

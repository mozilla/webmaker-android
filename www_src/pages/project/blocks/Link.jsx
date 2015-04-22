"use strict";

var React = require("react");

var Link = React.createClass({
  getInitialState: function() {
    return {
      href: this.props.href || "",
      label: this.props.label || "...",
      active: !!this.props.active
    };
  },
  render: function() {
    if(this.state.active)
      return <a href={this.state.href}>{this.state.label}</a>
    return <span className="fakelink">{this.state.label}</span>
  }
});

module.exports = Link;

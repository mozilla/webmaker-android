var React = require('react');

module.exports = React.createClass({
  render: function () {
    var style = {};

    return (
      <div
        onClick={this.props.onClick}
        className="page">
      </div>
    );
  }
});

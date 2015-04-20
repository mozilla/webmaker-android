var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <button
        onClick={this.handleClick}
        className="add-page">
      </button>
    )
  },
  handleClick: function (event) {
    this.props.onClick(event);
  }
});

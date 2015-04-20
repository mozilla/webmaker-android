var React = require('react');

module.exports = React.createClass({
  render: function () {
    var style = {};

    if (this.props.screenshot !== 'EMPTY') {
      style.backgroundImage = 'url(' + this.props.screenshot + ')';
    }

    return (
      <div
        onClick={this.props.onClick}
        className="page"
        style={style}>
      </div>
    );
  }
});

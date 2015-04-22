var React = require('react');
var Hammer = require('react-hammerjs');

module.exports = React.createClass({
  render: function () {
    var style = {};

    return (
      <Hammer
        onDoubleTap={this.props.onDoubleTap}
        className="page">
      </Hammer>
    );
  }
});

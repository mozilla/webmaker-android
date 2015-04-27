var React = require('react');
var Hammer = require('react-hammerjs');
var Link = require('../../components/link/link.jsx');

module.exports = React.createClass({
  render: function () {
    return (
      <Hammer
        onDoubleTap={this.props.onDoubleTap}
        className="page">
        <Link url="/projects/1234" href="/pages/project">EDIT</Link>
      </Hammer>
    );
  }
});

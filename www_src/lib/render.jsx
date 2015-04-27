var React = require('react');

var Base = React.createClass({
  render: function () {
    return (<div className="container">
        {this.props.children}
    </div>);
  }
});

module.exports = function (Handler) {
  React.render(<Base><Handler /></Base>, document.getElementById('app'));
};

var React = require('react');

var Base = React.createClass({
  render: function () {
    if (window.Android) {
      window.Android.logText('Hello world');
    } else {
      console.log('Hello world');
    }
    return (<div className="container">
        {this.props.children}
    </div>);
  }
});

module.exports = function (Handler) {
  React.render(<Base><Handler /></Base>, document.body);
};

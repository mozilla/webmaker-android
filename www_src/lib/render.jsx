var React = require('react');

var Base = React.createClass({
  jsComm: function (event) {
    this.setState({
      isVisible: event === 'onResume'
    });
  },
  getInitialState: function () {
    // Expose to android
    window.jsComm = this.jsComm;
    return {
      isVisible: true
    };
  },
  render: function () {
    var Route = this.props.route;
    return (<div className="container">
      <Route {...this.state} />
    </div>);
  }
});

module.exports = function (Route) {
  React.render(<Base route={Route} />, document.getElementById('app'));
};

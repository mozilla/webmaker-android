var React = require('react');
var dispatcher = require('../../lib/dispatcher');

var Spindicator = React.createClass({
  getInitialState: function () {
    return {
      isVisible: false
    };
  },
  show: function () {
    this.setState({
      isVisible: true
    });
  },
  hide: function () {
    this.setState({
      isVisible: false
    });
  },
  componentDidMount: function () {
    dispatcher.on('apiLagging', (event) => {
      this.show();
    });

    dispatcher.on('apiCallFinished', (event) => {
      this.hide();
    });
  },
  render: function () {
    return (
      <section id="spindicator" hidden={ !this.state.isVisible }>
        <div className="loader spinner"></div>
      </section>
    );
  }
});

module.exports = Spindicator;

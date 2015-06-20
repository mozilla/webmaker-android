var React = require('react/addons');
var dispatcher = require('../../lib/dispatcher');

var Snackbar = React.createClass({
  getInitialState: function() {
    return {
      message: this.props.message || "",
      hidden: true
    };
  },

  componentDidMount: function () {
    dispatcher.on('reportError', (event) => {
      this.setState({
        message: event.message,
        additionals: event.additionals,
        hidden: false
      },function() {
        // TODO: it may be possible to rewrite this so that it
        //       hooks into a CSS transition end, although the
        //       transition would be a little wonky
        setTimeout(_ => this.hide(), 3000);
      });
    });
  },

  render: function () {
    var className = "snackbar";
    if (this.state.hidden) {
      className = "hidden " + className;
    }
    return (<div className={className}>{ this.state.message }</div>);
  },

  /**
   * Hide the snackbar from view
   */
  hide: function() {
    this.setState({
      hidden: true
    });
  }
});

module.exports = Snackbar;

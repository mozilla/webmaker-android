var React = require('react');

var Shim = React.createClass({
  getInitialState: function () {
    return {
      isActive: false
    };
  },
  show: function () {
    this.setState({
      isActive: true
    });
  },
  hide: function () {
    this.setState({
      isActive: false
    });
  },
  render: function () {
    return (
      <section className={'shim' + (this.props.className ? ' ' + this.props.className : '')} hidden={ !this.state.isActive }>
        {this.props.children}
      </section>
    );
  }
});

module.exports = Shim;

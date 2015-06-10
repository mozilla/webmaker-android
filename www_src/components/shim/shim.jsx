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
  onShimClick: function () {
    if (this.props.onClick) {
      this.props.onClick.call();
    }
  },
  render: function () {
    return (
      <section onClick={this.onShimClick} className={'shim' + (this.props.className ? ' ' + this.props.className : '')} hidden={ !this.state.isActive }>
        {this.props.children}
      </section>
    );
  }
});

module.exports = Shim;

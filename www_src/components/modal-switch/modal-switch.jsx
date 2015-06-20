var React = require('react');
var Shim = require('../shim/shim.jsx');
var dispatcher = require('../../lib/dispatcher');

var ModalConfirm = React.createClass({
  getInitialState: function () {
    return {
      actions: [],
      callback: null
    };
  },
  show: function () {
    this.refs.shim.show();
  },
  hide: function () {
    this.refs.shim.hide();
  },
  onButtonClick: function (event) {
    if (this.state.callback) {
      this.state.callback.call(this, {
        label: event
      });
    }

    this.hide();
  },
  componentDidMount: function () {
    dispatcher.on('modal-switch:show', (event) => {
      this.setState(React.__spread(this.getInitialState(), event.config));
      this.show();
    });

    dispatcher.on('modal-switch:hide', (event) => {
      this.hide();
    });
  },
  render: function () {
    var buttons = this.state.actions.map(action => {
      return (
        <button onClick={this.onButtonClick.bind(this, action)}>{action}</button>
      );
    });

    return (
      <Shim ref="shim" className="modal-switch" onClick={this.hide}>
        <div className="window">
          {buttons}
        </div>
      </Shim>
    );
  }
});

module.exports = ModalConfirm;

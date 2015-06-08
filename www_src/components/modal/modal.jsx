var React = require('react');
var dispatcher = require('../../lib/dispatcher');

var Modal = React.createClass({
  getInitialState: function () {
    return {
      isActive: false,
      header: '',
      body: '',
      attribution: undefined,
      icon: '',
      buttonText: 'OK, got it!',
      callback: null
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
  onConfirmClick: function () {
    this.hide();

    if (this.state.callback) {
      this.state.callback.call();
    }
  },
  componentDidMount: function () {
    dispatcher.on('modal:show', (event) => {
      if (event.config.icon) {
        event.config.icon = '../../img/' + event.config.icon;
      }

      this.setState(React.__spread(this.getInitialState(), event.config));
      this.show();
    });

    dispatcher.on('modal:hide', (event) => {
      this.hide();
    });
  },
  render: function () {
    return (
      <section id="modal" hidden={ !this.state.isActive }>
        <div className="window">
          <header>
            <div className="text">{this.state.header}</div>
            <div className="icon">
              <img src={this.state.icon}/>
            </div>
          </header>
          <div className="content">
            <p>{this.state.body}</p>
            <button onClick={this.onConfirmClick} className="btn btn-block">{this.state.buttonText}</button>
            <div hidden={!this.state.attribution} className="attribution">
              <img src="../../img/cc.svg"/>
              <span>{this.state.attribution}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Modal;

var React = require('react');

var TextInput = React.createClass({
  getInitialState: function () {
    return {
      inputLength: 0,
      text: '',
      justTriedToOverflow: false
    };
  },
  onChange: function (e) {
    this.setState({
      text: e.target.value,
      inputLength: e.target.value.length
    });
  },
  onKeyDown: function (e) {
    // Allow the backspace key to work (code: 8)
    if (this.state.inputLength === this.props.maxlength && e.keyCode !== 8) {
      if (!this.state.justTriedToOverflow) {
        this.setState({
          justTriedToOverflow: true
        });

        setTimeout(function() {
          this.setState({
            justTriedToOverflow: false
          });
        }.bind(this), 1000);
      }

      e.preventDefault();
    } else {
      this.setState({
        justTriedToOverflow: false
      });
    }
  },
  render: function () {
    return (
      <div className={'text-input' + (this.state.justTriedToOverflow ? ' maxed' : '')}>
        <label>{this.props.label}</label>

        <input
          value={this.state.text}
          ref="input"
          maxLength={this.props.maxlength}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          type="text"/>

        <div className="indicator">{this.state.inputLength} / {this.props.maxlength}</div>
      </div>
    );
  }
});

module.exports = TextInput;

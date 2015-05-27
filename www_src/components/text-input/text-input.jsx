var React = require('react');

var TextInput = React.createClass({
  propTypes: {
    maxlength: React.PropTypes.number.isRequired,
    minlength: React.PropTypes.number
  },
  getInitialState: function () {
    return {
      inputLength: 0,
      text: '',
      isTooLong: false
    };
  },
  onChange: function (e) {
    this.setState({
      text: e.target.value,
      inputLength: e.target.value.length,
      isTooLong: e.target.value.length > this.props.maxlength ? true : false
    });
  },
  validate: function () {
    if ((!this.props.minlength || this.state.text.length > this.props.minlength) &&
      this.state.text.length <= this.props.maxlength) {
      return true;
    } else {
      return false;
    }
  },
  render: function () {
    return (
      <div className={'text-input' + (this.state.isTooLong ? ' maxed' : '')}>
        <label>{this.props.label}</label>

        <input
          value={this.state.text}
          ref="input"
          onChange={this.onChange}
          type="text"/>

        <div className="indicator">{this.state.inputLength} / {this.props.maxlength}</div>
      </div>
    );
  }
});

module.exports = TextInput;

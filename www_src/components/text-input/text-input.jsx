var React = require('react/addons');

var TextInput = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
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
    this.valueLink.requestChange(e.target.value);

    this.setState({
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
    var linkState = this.props.linkState || this.linkState;
    this.valueLink = linkState(this.props.id);

    return (
      <div className={'text-input' + (this.state.isTooLong ? ' maxed' : '')}>
        <label>{this.props.label}</label>

        <input
          value={this.valueLink.value}
          ref="input"
          onChange={this.onChange}
          type="text"/>

        <div className="indicator">{this.state.inputLength} / {this.props.maxlength}</div>
      </div>
    );
  }
});

module.exports = TextInput;

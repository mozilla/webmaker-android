var React = require('react');

var FormInput = React.createClass({
  getDefaultProps: function () {
    return {
      type: 'text',
      tabIndex: 0
    };
  },
  checkForReturn: function (e) {
    if (e.keyCode === 13) {
      if (typeof this.props.onReturn === 'function') {
        this.props.onReturn();
      }
    }
  },
  render: function () {
    return (<div className="form-group">
      <label htmlFor={this.props.name}>{this.props.label}</label>
      <input name={this.props.name} type={this.props.type} tabIndex={this.props.tabIndex} onKeyDown={this.checkForReturn} valueLink={this.props.valueLink} required={this.props.required} />
      <div className="error" hidden={!this.props.errors}>
        {this.props.errors && this.props.errors.join(' ')}
      </div>
      <p hidden={!this.props.helpText} className="help-text text-right">{this.props.helpText}</p>
    </div>);
  }
});

module.exports = FormInput;

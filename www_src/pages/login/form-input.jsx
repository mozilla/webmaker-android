var React = require('react');

var FormInput = React.createClass({
  getDefaultProps: function () {
    return {
      type: 'text'
    };
  },
  render: function () {
    return (<div className="form-group">
      <label for={this.props.name}>{this.props.label}</label>
      <input name={this.props.name} type={this.props.type} valueLink={this.props.valueLink} required={this.props.required} />
      <div className="error" hidden={!this.props.errors}>
        {this.props.errors && this.props.errors.join(' ')}
      </div>
      <p hidden={!this.props.helpText} className="help-text text-right">{this.props.helpText}</p>
    </div>);
  }
});

module.exports = FormInput;

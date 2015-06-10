var React = require('react/addons');

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getDefaultProps: function () {
    return {
      id: 'value',
      max: 100,
      min: 0,
      step: 1,
      unit: ''
    };
  },
  getInitialState: function () {
    return {
      value: typeof this.props.value !== 'undefined' ? this.props.value : 100
    };
  },
  onChange: function (e) {
    var value = parseFloat(e.target.value);
    this.valueLink.requestChange(value);
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },
  render: function () {
    var linkState = this.props.linkState || this.linkState;
    var valueLink = this.valueLink = linkState(this.props.id);

    return (
      <div className="range">
        <input value={valueLink.value} min={this.props.min} max={this.props.max} step={this.props.step} type="range" onChange={this.onChange} />
        <div className={'range-summary' + (parseFloat(valueLink.value) === this.props.min ? ' min' : '')}>{valueLink.value}{this.props.unit}</div>
      </div>
    );
  }
});

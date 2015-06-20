var React = require('react/addons');

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getDefaultProps: function () {
    return {
      id: 'value',
      max: 100,
      min: 0,
      step: 1,
      unit: '',
      percentage: false
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

    var currentValue = parseFloat(valueLink.value);
    var displayValue;

    if (this.props.percentage) {
      displayValue = `${Math.round(currentValue/this.props.max * 100)}%`;
    } else {
      displayValue = `${currentValue}${this.props.unit}`;
    }

    return (
      <div className="range">
        <input value={currentValue} min={this.props.min} max={this.props.max} step={this.props.step} type="range" onChange={this.onChange} />
        <div className={'range-summary' + (currentValue === this.props.min ? ' min' : '')}>{displayValue}</div>
      </div>
    );
  }
});

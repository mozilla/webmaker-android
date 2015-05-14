var React = require('react/addons');

var Range = React.createClass({
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
      value: 100
    };
  },
  onChange: function (e) {
    this.valueLink.requestChange(parseFloat(e.target.value));
  },
  render: function () {
    var linkState = this.props.linkState || this.linkState;
    var valueLink = this.valueLink = linkState(this.props.id);

    return (
      <div className="range">
        <input min={this.props.min} max={this.props.max} step={this.props.step} type="range" onChange={this.onChange}/>
        <div className={'range-summary' + (parseFloat(valueLink.value) === this.props.min ? ' min' : '')}>{valueLink.value}{this.props.unit}</div>
      </div>
    );
  }
});

module.exports = Range;

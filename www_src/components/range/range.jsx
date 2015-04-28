var React = require('react/addons');

var Range = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getDefaultProps: function () {
    return {
      id: 'value',
      max: 100,
      min: 0,
      unit: '%'
    };
  },
  getInitialState: function () {
    return {
      value: 100
    };
  },
  render: function () {
    var linkState = this.props.linkState || this.linkState;
    var valueLink = linkState(this.props.id);
    return (
      <div className="range">
        <input min={this.props.min} max={this.props.max} type="range" valueLink={valueLink}/>
        <div className={'range-summary' + (parseInt(valueLink.value, 0) === this.props.min ? ' min' : '')}>{valueLink.value}{this.props.unit}</div>
      </div>
    );
  }
});

module.exports = Range;

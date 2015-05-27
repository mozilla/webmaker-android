var React = require('react/addons');
var classNames = require('classnames');

// Internal -- just the container
var OptionPanel = React.createClass({
  render: function () {
    return (<div className="option-panel">
      {this.props.children}
    </div>);
  }
});

var Checkbox = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getDefaultProps: function () {
    return {
      linkState: this.linkState,
      checkedLabel: true,
      uncheckedLabel: false
    };
  },
  onChange: function (e) {
    var val = e.target.checked ? this.props.checkedLabel : this.props.uncheckedLabel;
    this.valueLink.requestChange(val);
  },
  isChecked: function () {
    return this.valueLink.value === this.props.checkedLabel;
  },
  render: function () {
    var linkState = this.props.linkState;
    this.valueLink = linkState(this.props.id);
    return (<label className={classNames('label', {selected: this.isChecked()})}>
      <input className="sr-only" checked={this.isChecked()} onChange={this.onChange} type="checkbox" />
      <img className="icon" src={this.props.icon}/>
    </label>);
  }
});

var CheckboxSet = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getDefaultProps: function () {
    return {
      linkState: this.linkState
    };
  },
  render: function () {
    return (<OptionPanel>
      {this.props.options.map((props, i) => <Checkbox {...props} key={i} linkState={this.props.linkState} />)}
    </OptionPanel>);
  }
});

var Radio = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getDefaultProps: function () {
    return {
      linkState: this.linkState
    };
  },
  onChange: function (e) {
    this.valueLink.requestChange(e.target.value);
  },
  render: function () {
    this.valueLink = this.props.linkState(this.props.id);
    var currentVal = this.valueLink.value;
    return (<OptionPanel>
      {this.props.options.map((item, i) => {
        return (<label key={i} className={classNames('label', {selected: item.value === currentVal})}>
          <input
            className="sr-only"
            name={'radio_' + this.props.id}
            type="radio"
            value={item.value}
            checked={item.value === currentVal}
            onChange={this.onChange} />
          <img className="icon" src={item.icon}/>
        </label>);
      })}
    </OptionPanel>);
  }
});

module.exports = {
  Checkbox,
  CheckboxSet,
  Radio
};

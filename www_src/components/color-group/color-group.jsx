var React = require('react/addons');
var Link = require('../link/link.jsx');
var classNames = require('classnames');

var ColorGroup = React.createClass({
  colors: ['transparent', '#FFF', '#99CA47', '#EFC246', '#E06A2C', '#69A0FC'],
  mixins: [React.addons.LinkedStateMixin],
  getDefaultProps: function () {
    return {
      id: 'value',
      tinkerUrl: '/projects/123/elements/1/color'
    };
  },
  getInitialState: function () {
    return {
      value: 'transparent'
    };
  },
  onChange: function (e) {
    if (this.valueLink) this.valueLink.requestChange(e.target.value);
  },
  render: function () {
    var linkState = this.props.linkState || this.linkState;
    this.valueLink = linkState(this.props.id);
    return (<div className="color-group">
      {this.colors.map(color => {
        var className = {
          'color-swatch': true,
          checked: this.valueLink.value === color
        };
        var innerClassName = {
          'color-swatch-inner': true,
          transparent: color === 'transparent',
          white: color === '#FFF'
        };
        return <label className={classNames(className)}>
          <span className={classNames(innerClassName)} style={{backgroundColor: color}} />
          <input className="sr-only" name="color" type="radio" value={color} checked={this.valueLink.value === color ? true : null} onChange={this.onChange} />
        </label>
      })}
      <div className="tinker-container">
        <Link className="tinker" url={this.props.tinkerUrl} href="/pages/tinker">
          <img src="../../img/tinker.png" />
        </Link>
      </div>
    </div>);
  }
});

module.exports = ColorGroup;

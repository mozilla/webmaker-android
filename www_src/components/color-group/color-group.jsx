var React = require('react/addons');
var Link = require('../link/link.jsx');
var classNames = require('classnames');

var ColorGroup = React.createClass({
  statics: {
    defaultColors: ['transparent', '#FFF', '#99CA47', '#EFC246', '#E06A2C', '#69A0FC']
  },
  mixins: [React.addons.LinkedStateMixin],
  getDefaultProps: function () {
    return {
      colors: this.defaultColors.slice(),
      id: 'value'
    };
  },
  getInitialState: function () {
    return {
      value: this.props.colors[0]
    };
  },
  getTinkerUrl: function () {
    var params = this.props.params;
    if (!params) {
      return;
    }
    return `/users/${params.user}/projects/${params.project}/pages/${params.page}/elements/${params.element}/propertyName/${this.props.id}`;
  },
  onChange: function (e) {
    if (this.valueLink) {
      this.valueLink.requestChange(e.target.value);
    }
  },
  render: function () {
    var colors = this.props.colors;
    var linkState = this.props.linkState || this.linkState;
    this.valueLink = linkState(this.props.id);

    // If current color is custom, add it to the list
    if (colors.indexOf(this.valueLink.value) === -1) {
      colors = colors.concat([this.valueLink.value]);
    }

    return (<div className="color-group">

      {colors.map(color => {
        var className = {
          'color-swatch': true,
          checked: this.valueLink.value === color
        };
        var innerClassName = {
          'color-swatch-inner': true,
          transparent: color === 'transparent',
          white: color === '#FFF'
        };
        return (<label className={classNames(className)}>
          <span className={classNames(innerClassName)} style={{backgroundColor: color}} />
          <input className="sr-only" name="color" type="radio" value={color} checked={this.valueLink.value === color ? true : null} onChange={this.onChange} />
        </label>);
      })}
      <div className="tinker-container" hidden={!this.props.params || !this.props.id}>
        <Link className="tinker" url={this.getTinkerUrl()} href="/pages/tinker">
          <img src="../../img/tinker.png" />
        </Link>
      </div>
    </div>);
  }
});

module.exports = ColorGroup;

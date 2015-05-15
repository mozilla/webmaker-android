var React = require('react');
var classNames = require('classnames');

var Loader = React.createClass({
  getDefaultProps: function () {
    return {
      on: false
    };
  },
  render: function () {
    return (<div className={classNames('loading', {on: this.props.on})}>
      <div className="loading-bar">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="sr-only">Loading!</div>
      </div>
    </div>);
  }
});

module.exports = Loader;

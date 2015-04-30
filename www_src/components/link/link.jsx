var React = require('react');
var assign = require('react/lib/Object.assign');

var Link = React.createClass({
  getDefaultProps: function () {
    return {
      tagName: 'a'
    };
  },
  render: function () {
    var className = this.props.className ? (this.props.className + ' link') : 'link';
    var props = assign({}, this.props, {
      className,
      onClick: (e) => {
        if (window.Android) {
          e.preventDefault();
          window.Android.setView(this.props.url);
        }
      }
    });
    return React.createElement(this.props.tagName, props);
  }
});

module.exports = Link;

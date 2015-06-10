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
          if (this.props.external) {
            window.Android.openExternalUrl(this.props.external);
          } else if (this.props.url) {
            window.Android.setView(this.props.url);
          }
        }
      }
    });
    if (this.props.external) {
      props.target = '_blank';
      props.href = this.props.href || this.props.external;
    }
    return React.createElement(this.props.tagName, props);
  }
});

module.exports = Link;

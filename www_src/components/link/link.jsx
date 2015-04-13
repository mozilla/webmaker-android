var React = require('react');
var assign = require('react/lib/Object.assign');

var Link = React.createClass({
  render: function () {
    var props = assign(this.props, {
      onClick: (e) => {
        if (window.Android) {
          e.preventDefault();
          window.Android.setView(this.props.url);
        }
      }
    });
    return (<a {...props} />);
  }
});

module.exports = Link;

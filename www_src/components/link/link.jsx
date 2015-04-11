var React = require('react');
var assign = require('react/lib/Object.assign');

var Link = React.createClass({
  render: function () {
    var props = assign({
      onClick: (e) => {
        if (window.Android) {
          e.preventDefault();
          window.Android.setView(this.props.url);
        }
       }
    }, this.props);
    return (<a {...props}>
      {this.props.children}
    </a>);
  }
});

module.exports = Link;

var React = require('react');
var render = require('../../lib/render.jsx');

var Three = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function () {
    return <div>This is section 3</div>
  }
});

// Render!
render(Three);

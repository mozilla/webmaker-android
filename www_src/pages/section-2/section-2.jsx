var React = require('react');
var render = require('../../lib/render.jsx');

var Two = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function () {
    return <div>This is section 2</div>
  }
});

// Render!
render(Two);

var React = require('react');
var render = require('../../lib/render.jsx');

var Project = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function () {
    return <div>Edit your project!</div>
  }
});

// Render!
render(Project);

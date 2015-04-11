var React = require('react');
var render = require('../../lib/render.jsx');
var Link = require('../../components/link/link.jsx');

var Map = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function () {
    return <div>
      This is a map. <Link url="/project/123" href="/pages/project">Go to project</Link>
    </div>
  }
});

// Render!
render(Map);

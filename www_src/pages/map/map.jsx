var React = require('react');
var render = require('../../lib/render.jsx');
var Link = require('../../components/link/link.jsx');

var Map = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function () {
    return <div>
      <Link className="tile map-tile" url="/project/123" href="/pages/project">
        <img src="../../img/toucan.svg" />
      </Link>
      <Link className="tile map-tile" url="/project/123" href="/pages/project">
        <img src="../../img/toucan.svg" />
      </Link>
      <Link className="tile map-tile" url="/project/123" href="/pages/project">
        <img src="../../img/toucan.svg" />
      </Link>
    </div>
  }
});

// Render!
render(Map);

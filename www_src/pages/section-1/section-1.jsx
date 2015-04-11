var React = require('react');
var render = require('../../lib/render.jsx');
var Link = require('../../components/link/link.jsx');

var Main = React.createClass({
  render: function () {
    return (
      <div>
        <Link url="/map/123" href="/pages/map" className="tile"><img src="../../img/demo.png" /></Link>
      </div>
    );
  }
});

// Render!
render(Main);

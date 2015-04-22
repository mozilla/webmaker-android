var React = require('react');
var render = require('../../lib/render.jsx');
var Link = require('../../components/link/link.jsx');

var Main = React.createClass({
  render: function () {
    return (
      <div className="demo">
        <Link url="/map/123" href="/pages/map" className="tile tile-demo">
          <div className="inner">
            <div className="img">
              <h1>section 2, yo!</h1>
              <img src="../../img/toucan.svg" />
            </div>
          </div>
        </Link>
      </div>
    );
  }
});

// Render!
render(Main);

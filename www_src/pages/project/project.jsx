var React = require('react');
var render = require('../../lib/render.jsx');
var Link = require('../../components/link/link.jsx');

var Project = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function () {
    return <div className="demo">
      <div className="tile tile-demo">
        <div className="inner">
          <Link className="img editable" url="/project/123/1" href="/pages/editor">
            <img src="../../img/toucan.svg" />
          </Link>
        </div>
      </div>
    </div>
  }
});

// Render!
render(Project);

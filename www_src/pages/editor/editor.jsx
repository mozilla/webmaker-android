var React = require('react');
var render = require('../../lib/render.jsx');
var Link = require('../../components/link/link.jsx');

var Editor = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  componentWillMount: function() {
    console.log(window.location.toString());
  },
  render: function () {
    return <div>
      <div className="editor-preview">
        <img src="../../img/toucan.svg" />
      </div>
      <div className="editor-options">
        <button>Change Image</button>
        <label>Transparency</label>
        <input type="range" />
        <label>Corners</label>
        <input type="range" />
        <Link url="/project/123/1/color" href="/pages/tinker">Tinker Mode</Link>
      </div>
    </div>
  }
});

// Render!
render(Editor);

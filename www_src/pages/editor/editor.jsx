var React = require('react');
var render = require('../../lib/render.jsx');

var Editor = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
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
      </div>
    </div>
  }
});

// Render!
render(Editor);

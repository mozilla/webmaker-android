var React = require('react');
var render = require('../../lib/render.jsx');

var Tinker = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function () {
    return (
      <div>
        <div className="editor-preview">
          <img src="../../img/toucan.svg" />
        </div>
        <div className="editor-options">
          <h3>THIS IS TINKER MODE YO</h3>
          <input type="range" />
          <input type="range" />
          <input type="range" />
        </div>
      </div>
    );
  }
});

// Render!
render(Tinker);

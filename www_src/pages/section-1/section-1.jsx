var React = require('react');
var render = require('../../lib/render.jsx');
var Binding = require('../../lib/binding.jsx');
var Link = require('../../components/link/link.jsx');

var Main = React.createClass({
  mixins: [Binding],
  getInitialState: function () {
    return {
      test: false
    };
  },
  onClick: function () {
    this.setState({test: !this.state.test});
  },
  render: function () {
    return (
      <div className="demo">
        <Link url="/map/123" href="/pages/map" className="tile tile-demo">
          <div className="inner">
            <div className="img">
              <img src="../../img/toucan.svg" />
            </div>
          </div>
        </Link>
        <p><button onClick={this.onClick}>{this.state.test ? 'on' : 'off'}</button></p>
      </div>
    );
  }
});

// Render!
render(Main);

var React = require('react');
var render = require('../../lib/render.jsx');
var Link = require('../../components/link/link.jsx');

// TEMP: Change div w. zIndex to Draggable to enable drag
// var Draggable = require('react-draggable');

var Hammer = require('react-hammerjs');
var Grid = require('./grid.jsx');

var App = React.createClass({
  getInitialState: function () {
    return {
      zoomLevel: 6.25
    }
  },
  contextTypes: {
    router: React.PropTypes.func
  },
  setGridZoomLevel: function (amount) {
    this.refs.masterGrid.setZoomLevel(amount);
  },
  componentDidMount: function () {
    // Pass container dimensions in once initial render is complete
    //   since container must be measured before tiles can be properly laid out...
    var elWrapper = this.refs.wrapper.getDOMNode();
    this.refs.masterGrid.setContainerDimensions(elWrapper.clientWidth, elWrapper.clientHeight);

    setTimeout(function() {
      this.refs.masterGrid.setZoomLevel(this.state.zoomLevel);
    }.bind(this), 100);
  },
  onZoomChange: function (event) {
    this.setState({
      zoomLevel: event.pagesWide
    });
  },
  render: function () {
    return (
      <div className="section-2">
        <div ref="wrapper" className="wrapper">
          <div zIndex={100}>
            <div>
              <Grid ref="masterGrid" aspectRatio={"35:40"} onZoomChange={ this.onZoomChange } />
            </div>
          </div>
        </div>
        <div className="segmented-control">
          <Hammer
            className={ this.state.zoomLevel < 6.25 ? 'enabled' : 'disabled' }
            component="button"
            onTap={ this.setGridZoomLevel.bind(this, 6.25) }>
            -
          </Hammer>
          <Hammer component="button" className="disabled">+</Hammer>
          <Link href="/project/1234">Go to project view!</Link>
        </div>
      </div>
    );
  }
});

render(App);

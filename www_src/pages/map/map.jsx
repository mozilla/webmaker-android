var React = require('react');
var render = require('../../lib/render.jsx');

// TEMP: Change div w. zIndex to Draggable to enable drag
// var Draggable = require('react-draggable');

var Hammer = require('react-hammerjs');
var Grid = require('./grid.jsx');

var App = React.createClass({
  getInitialState: function () {
    return {
      zoomLevel: 0,
      fullyZoomedIn: false
    }
  },
  contextTypes: {
    router: React.PropTypes.func
  },
  zoomGridOut: function () {
    this.refs.masterGrid.zoomOut();
  },
  zoomGridIn: function () {
    this.refs.masterGrid.zoomIn();
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
      zoomLevel: event.currentZoomIndex,
      fullyZoomedIn: event.fullyZoomedIn
    });
  },
  render: function () {
    return (
      <div id="map-view" className={ 'zoom-' + this.state.zoomLevel }>
        <div className="headerBar">Project Name</div>
        <div ref="wrapper" className="wrapper">
          <div zIndex={100}>
            <div>
              <Grid ref="masterGrid" aspectRatio={"35:40"} onZoomChange={ this.onZoomChange } />
            </div>
          </div>
        </div>
        <div className="segmented-control">
          <Hammer
            className={ this.state.zoomLevel > 0 ? 'enabled' : 'disabled' }
            component="button"
            onTap={ this.zoomGridOut }>
            -
          </Hammer>
          <Hammer
            className={ !this.state.fullyZoomedIn ? 'enabled' : 'disabled' }
            component="button"
            onTap={ this.zoomGridIn }>
            +
          </Hammer>
        </div>
      </div>
    );
  }
});

render(App);

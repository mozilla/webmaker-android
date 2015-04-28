var React = require('react');
var render = require('../../lib/render.jsx');
var Binding = require('../../lib/binding.jsx');
var Hammer = require('react-hammerjs');
var Grid = require('./grid.jsx');

var App = React.createClass({
  mixins: [Binding],
  getInitialState: function () {
    return {
      zoomLevel: 1,
      fullyZoomedIn: false
    };
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
      <div id="map" className={ 'zoom-' + this.state.zoomLevel }>
        <div ref="wrapper" className="wrapper">
          <div>
            <Grid ref="masterGrid" aspectRatio={"35:40"} onZoomChange={ this.onZoomChange } />
          </div>
        </div>
        <div className="segmented-control">
          <Hammer
            className={ 'zoom-out ' + (this.state.zoomLevel > 0 ? 'enabled' : 'disabled') }
            component="button"
            onTap={ this.zoomGridOut }></Hammer>
          <Hammer
            className={ 'zoom-in ' + (!this.state.fullyZoomedIn ? 'enabled' : 'disabled') }
            component="button"
            onTap={ this.zoomGridIn }></Hammer>
          <Hammer
            className="delete"
            component="button"></Hammer>
        </div>
      </div>
    );
  }
});

render(App);

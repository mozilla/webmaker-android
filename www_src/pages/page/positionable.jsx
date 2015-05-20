var React = require("react");
var classes = require("classnames");
var Spec = require('../../lib/spec');
var blocks = require('../../blocks/all.jsx');

var Positionable = React.createClass({

  getDefaultProps: function () {
    return {
      interactive: false,
      x: 0,
      y: 0,
      scale: 1,
      angle: 0,
      zIndex: 1
    };
  },

  getInitialState: function() {
    var initial = {
      x: this.props.x,
      y: this.props.y,
      scale: this.props.scale,
      angle: this.props.angle,
      zIndex: this.props.zIndex,
      touchactive: false
    };
    return initial;
  },

  componentDidMount: function() {

    // Don't attach touch handlers for non-interactive elements
    if(!this.props.interactive) return;

    var touchHandler = this.touchhandler = require("./touchhandler")(this);
    var dnode = this.getDOMNode();
    dnode.addEventListener("mousedown", touchHandler.startmark);
    dnode.addEventListener("mousemove", touchHandler.panmove);
    dnode.addEventListener("mouseup", touchHandler.endmark);

    // touch start enables the transform overlay, which handles
    // all the touch/mouse interaction as long as there are any
    // active fingers
    dnode.addEventListener("touchstart", touchHandler.startmark);
    dnode.addEventListener("touchmove", touchHandler.panmove);
    dnode.addEventListener("touchend", touchHandler.endmark);

    // the overlay handles all the two finger touch events
    var onode = this.refs.overlay.getDOMNode();
    onode.addEventListener("touchstart", touchHandler.secondFinger);
    onode.addEventListener("touchmove", touchHandler.panmove);
    onode.addEventListener("touchend", touchHandler.endmark);

    var dims = dnode.getBoundingClientRect();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(!prevState.touchactive && this.state.touchactive) {
      this.props.onUpdate(this.state);
    }
  },

  render: function() {
    var style = Spec.propsToPosition(this.state);

    var className = classes({
      positionable: true,
      touchactive: this.state.touchactive,
      current: this.props.isCurrent
    });

    var Element = blocks[this.props.type];

    return (
      <div className="positionable-container" key={this.props.key}>
        <div ref="overlay" className="touch-overlay" hidden={!this.state.touchactive} />
        <div className={className} style={style}>
          <Element {...this.props} />
        </div>
      </div>
    );
  },

  onTouchEnd: function () {
    if (this.props.onTouchEnd) this.props.onTouchEnd(this.state);
  },

  handleTranslation: function(x, y) {
    this.setState({
      x: x,
      y: y
    }, function() {
      if(this.props.onUpdate) {
        this.props.onUpdate(this.state);
      }
    });
  },

  handleRotationAndScale: function(angle, scale) {
    this.setState({
      angle: angle,
      scale: scale
    }, function() {
      if(this.props.onUpdate) {
        this.props.onUpdate(this.state);
      }
    });
  },

  handleZIndexChange: function(zIndex) {
    this.setState({
      zIndex: zIndex
    });
  }
});

module.exports = Positionable;

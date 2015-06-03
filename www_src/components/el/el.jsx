/**
 * FIXME: TODO: This file need heavy refactoring, as it's mixing props and state to
 *              a very entangle data thing, even tapping into getInitialState during
 *              render, which we should never be doing.
 */

var React = require('react');
var classes = require('classnames');
var Spec = require('../../lib/spec');
var touchhandler = require("../../lib/touchhandler");
var dispatcher = require('../../lib/dispatcher');

var El = React.createClass({

  statics: {
    types: {
      image: require('./types/image.jsx'),
      text: require('./types/text.jsx'),
      link: require('./types/link.jsx')
    }
  },

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
    if (!this.props.interactive) {
      return;
    }

    var touchHandler = this.touchhandler = touchhandler(this);
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
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(!prevState.touchactive && this.state.touchactive) {
      this.onUpdate();
    }

    if (this.props.type === 'link') {
      this.positionButton();
    }
  },

  // FIXME: TODO: This function needs to at the very least be moved to the link element,
  //              but should really be reengineered out of existence, as it's using old
  //              HTML+JS to solve a problem in React, which has very different ways of
  //              doing so.
  positionButton: function () {
    // Button position is based on the rendered DOM, so we're setting it directly post-render
    var elWrapper = this.getDOMNode();

    // FIXME: TODO: React has references, so using querySelector is an immediate red flag
    var elStyleWrapper = elWrapper.querySelector('.style-wrapper');
    var elButton = elWrapper.querySelector('.meta-button');

    var boundingBox = elStyleWrapper.getBoundingClientRect();
    var buttonStyle = this.getInitialState();

    buttonStyle.y += (((boundingBox.bottom - boundingBox.top) / 2) + 40);
    buttonStyle.angle = 0;
    buttonStyle.scale = 1;

    // FIXME: TODO: this should not be here. This data should be read from state (since we
    //              set it purely during the component's life time), and then use that to
    //              render the button with the correct style in render().
    elButton.style.transform = Spec.propsToPosition(buttonStyle).transform;
  },

  onLinkDestClick: function () {
    if (this.props.targetPageId) {
      if (window.Android) {
        window.Android.setView(`/projects/${this.props.targetProjectId}/pages/${this.props.targetPageId}`);
      }
    } else {
      dispatcher.fire('linkDestinationClicked', this.props);
    }
  },

  render: function() {
    // FIXME: TODO: this should be this.state - getInitialState() is purely for
    //              getting the state of a component prior to mounting, we've
    //              overloaded it to do somehow it was never intended to do.
    var state = this.getInitialState();

    var className = classes('el', 'el-' + this.props.type, {
      touchactive: this.state.touchactive,
      current: this.props.isCurrent
    });

    var Element = El.types[this.props.type];

    var setDestinationButton;

    if (this.props.type === 'link') {
      setDestinationButton = (
        <div className="el-container" key={this.props.key + '-2'}>
          {/* using onTouchEnd because onClick doesn't work for some reason...touchhandler.js preventing it? */}
          <button
            className="btn meta-button"
            onTouchEnd={this.onLinkDestClick}>
              <img className="icon" src="../../img/flag.svg" />
              {this.props.targetPageId ? 'Follow Link' : 'Set Destination'}
          </button>
        </div>
      );
    }

    // Note: we're rending the element off of this.props, NOT this.state:
    return (
      <div className="el-wrapper">
        <div className="el-container" key={this.props.key}>
          <div ref="overlay" className="touch-overlay" hidden={!this.state.touchactive} />
          <div className={className + ' style-wrapper'} style={Spec.propsToPosition(state)}>
            <Element {...this.props} />
          </div>
        </div>
        { setDestinationButton }
      </div>
    );
  },

  onTouchEnd: function (modified) {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(modified);
    }
  },

  onUpdate: function () {
    if (this.props.onUpdate) {
      this.props.onUpdate(this.state);
    }
  },

  /**
   * Translate an element on the page but prevent it from being dragged
   * off entirely, by forcing a "safe zone" into which elements get locked
   * if they'd otherwise run off the page.
   */
  handleTranslation: function(x, y) {
    var thresh = 45;

    var width = document.body.getBoundingClientRect().width/2 - thresh;
    var height = document.body.getBoundingClientRect().height/2 - thresh;

    this.setState({
      x: x,
      y: y
    }, function() {

      // FIXME: TODO: this should be done before, not after, updating the state.
      var changed = false;

      var updatefunction = this.onUpdate;
      updatefunction();

      var x = this.state.x;
      var y = this.state.y;

      if (x > width ) {/* Moving right and we're already near the right edge */
        x = width;
        changed = true;
      }

      if (x < -width) { /* Moving left and we're already near the left edge */
        x = -width;
        changed = true;
      }

      if (y > height) { /* Moving down and we're already near the bottom */
        y = height;
        changed = true;
      }

      if (y < -height) {/* Moving up and we're already near the top */
          y = -height;
          changed = true;
      }

      if (changed) {
        this.setState({
            x: x,
            y: y
          }, updatefunction);
      }
    });
  },

  handleRotationAndScale: function(angle, scale) {
    this.setState({
      angle: angle,
      scale: scale
    }, function() {
      this.onUpdate();
    });
  },

  handleZIndexChange: function(zIndex) {
    this.setState({
      zIndex: zIndex
    });
  }
});

module.exports = El;

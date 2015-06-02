var React = require('react');
var El = require('../../components/el/el.jsx');
var assign = require('react/lib/Object.assign');

var ElementGroup = React.createClass({
  getDefaultProps: function () {
    return {
      elements: {},
      currentElementId: -1,
      interactive: false
    };
  },
  formElement: function(elementId, elProps) {
    return (
      <div className={'el-wrapper' + (elProps.isCurrent ? ' current' : '')}>
        <El key={'positionable' + elementId} {...elProps} />
      </div>
    );
  },
  processProperties: function(elementId) {
    var elProps = this.props.elements[elementId];

    if (!elProps || !elProps.type) {
      return false;
    }

    elProps = assign({}, elProps, {
      isCurrent: this.props.currentElementId === elementId,
      interactive: this.props.interactive
    });

    // Add callbacks for interactive mode
    if (this.props.onTouchEnd) {
      elProps.onTouchEnd = this.props.onTouchEnd(elementId);
    }

    if (this.props.onUpdate) {
      elProps.onUpdate = this.props.onUpdate(elementId);
    }

    return this.formElement(elementId, elProps);
  },
  formElements: function () {
    return Object.keys(this.props.elements).map(this.processProperties);
  },
  render: function () {
    return (
      <div className="element-group">
        <div className="deselector" onClick={this.props.onDeselect} />
        { this.formElements() }
      </div>
    );
  }
});

module.exports = ElementGroup;

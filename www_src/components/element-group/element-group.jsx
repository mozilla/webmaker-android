var React = require('react');
var BasicElement = require('../../components/basic-element/basic-element.jsx');
var assign = require('react/lib/Object.assign');

var ElementGroup = React.createClass({
  getDefaultProps: function () {
    return {
      elements: {},
      currentElementId: -1,
      interactive: false
    };
  },

  /**
   * Generate the JSX for the element
   * @param {id} elementId the element's id in the this.props-passed `elements` dictionary
   * @param {object} properties The element property sheet from which to build the JSX representation
   * @return {JSX} an element's JSX representation
   */
  formElement: function(elementId, properties) {

    return (
      <div className={'el-wrapper' + (properties.isCurrent ? ' current' : '')}>
        <BasicElement key={'positionable' + elementId} id={elementId} {...properties} zIndex={properties.zIndex} />
      </div>
    );
  },

  /**
   * Process an element's property sheet, transforming it into
   * a JSX object for use by React,
   * @param {id} elementId the element's id in the this.props-passed `elements` dictionary
   * @return {JSX} an element's JSX representation
   */
  processProperties: function(elementId) {
    var properties = this.props.elements[elementId];

    if (!properties || !properties.type) {
      return false;
    }

    properties = assign({}, properties, {
      isCurrent: this.props.currentElementId === elementId,
      interactive: this.props.interactive
    });

    // Add callbacks for interactive mode
    if (this.props.onTouchEnd) {
      properties.onTouchEnd = this.props.onTouchEnd(elementId);
    }

    if (this.props.onUpdate) {
      properties.onUpdate = this.props.onUpdate(elementId);
    }

    return this.formElement(elementId, properties);
  },

  /**
   * Convert all passed element property sheets into JSX elemenets
   * @return {JSX[]} And array of JSX representations of each element in this.props.elemeents
   */
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

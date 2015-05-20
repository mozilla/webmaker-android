var React = require('react');
var Positionable = require('../../pages/page/positionable.jsx');
var assign = require('react/lib/Object.assign');

var ElementGroup = React.createClass({
  getDefaultProps: function () {
    return {
      elements: [],
      currentElement: -1,
      interactive: false
    };
  },
  render: function () {
    return (<div className="positionables">
      <div className="deselector" onClick={this.props.onDeselect} />
      {this.props.elements.map((elProps, i) => {

        if (!elProps || !elProps.type) return false;

        elProps = assign({}, elProps, {
          parentWidth: this.props.dims.width,
          parentHeight: this.props.dims.height,
          isCurrent: this.props.currentElement === i,
          interactive: this.props.interactive
        });

        // Add callbacks for interactive mode
        if (this.props.onTouchEnd) elProps.onTouchEnd = this.props.onTouchEnd(i);
        if (this.props.onUpdate) elProps.onUpdate = this.props.onUpdate(i);

        return <Positionable key={'positionable' + i} {...elProps} />
      })}
    </div>);
  }
});

module.exports = ElementGroup;

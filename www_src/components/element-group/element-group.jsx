var React = require('react');
var El = require('../../components/el/el.jsx');
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
    return (<div className="element-group">
      <div className="deselector" onClick={this.props.onDeselect} />
      {this.props.elements.map((elProps, i) => {

        if (!elProps || !elProps.type) {
          return false;
        }

        elProps = assign({}, elProps, {
          isCurrent: this.props.currentElement === i,
          interactive: this.props.interactive
        });

        // Add callbacks for interactive mode
        if (this.props.onTouchEnd) {
          elProps.onTouchEnd = this.props.onTouchEnd(i);
        }

        if (this.props.onUpdate) {
          elProps.onUpdate = this.props.onUpdate(i);
        }

        return (<El key={'positionable' + i} {...elProps} />);
      })}
    </div>);
  }
});

module.exports = ElementGroup;

var React = require('react');
var utils = require('../lib/propUtils');
var assign = require('react/lib/Object.assign');

var Text = React.createClass({
  statics: {
    defaults: {
      fontSize: 18,
      fontFamily: 'Roboto',
      color: '#645839',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      innerHTML: 'Hello world'
    }
  },

  getInitialState: function() {
    return {
      editing: false
    };
  },

  getDefaultProps: function () {
    return this.defaults;
  },

  render: function() {
    var style = {};
    var props = this.props;
    ['fontFamily', 'color', 'fontWeight', 'fontStyle', 'textDecoration', 'textAlign', 'whiteSpace']
      .forEach(prop => style[prop] = props[prop]);

    if (props.position) {
      style = assign(style, utils.propsToPosition(props));
    }

    var inputStyle = assign({}, style);
    assign(inputStyle, {
      display: "inline-block",
      background: "transparent",
      border: "none",
      width: "100%",
      height: "100%"
    });

    var onPClick = this.activate;
    var content = props.innerHTML;
    if (this.state.editing) {
      onPClick = false;
      content = <input ref="input"
                       style={inputStyle}
                       onClick={this.killEvent}
                       onChange={this.sendTextUpdate}
                       value={content} />;
    }
    return <p ref="dims" style={style} onClick={onPClick}>{content}</p>;
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(this.refs.input) {
      this.refs.input.getDOMNode().focus();
    }
  },

  // start editing, but only if we were built with the "activate" property
  activate: function() {
    if (!!this.props.active) {
      this.startEditing();
    }
  },

  // prevent this click from going up to the owning element(s)
  killEvent: function(evt) {
    evt.stopPropagation();
  },

  // send our current value up to our parent for handling
  sendTextUpdate: function(evt) {
    var value = evt.target.value;
    this.props.updateText(value);
  },

  // public API: "flip between editing/not editing"
  toggleEditing: function() {
    this.setState({
      editing: !this.state.editing
    }, function() {
      this.props.setEditMode(this.state.editing);
    });
  },

  // public API: "start editing"
  startEditing: function() {
    if (!this.state.editing) {
      this.toggleEditing();
    }
  }

  // public API: "stop editing"
  stopEditing: function() {
    if (this.state.editing) {
      this.toggleEditing();
    }
  }
});

module.exports = Text;

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

    var content = props.innerHTML;
    if (this.state.editing) {
      content = <input ref="input" style={inputStyle} onBlur={this.commitText} onChange={this.sendTextUpdate} value={content} />;
    }
    return <p ref="dims" style={style}>{content}</p>;
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(this.refs.input) {
      this.refs.input.getDOMNode().focus();
    }
  },

  sendTextUpdate: function(evt) {
    var value = evt.target.value;
    this.props.updateText(value);
  },

  toggleEditing: function() {
    var toggled = !this.state.editing;
    this.setState({
      editing: toggled
    });
    return toggled;
  }
});

module.exports = Text;

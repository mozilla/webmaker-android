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
    Object.keys(props).forEach(prop => {
      if (prop === "innerHTML") return;
      style[prop] = props[prop]
    });

    if (props.position) {
      style = assign(style, utils.propsToPosition(props));
    }

    var inputStyle = assign({}, style);
    inputStyle.background = "transparent";
    inputStyle.border = "none";

    var content = props.innerHTML;
    if (this.state.editing) {
      content = <input ref="input" style={inputStyle} onBlur={this.commitText} onChange={this.sendTextUpdate} value={content} />;
    }
    return <p style={style} onClick={this.editText}>{content}</p>;
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

  editText: function() {
    this.setState({
      editing: true
    });
  },

  commitText: function() {
    this.setState({
      editing: false
    });
  }
});

module.exports = Text;

var React = require('react');
var assign = require('react/lib/Object.assign');

module.exports = {
  getInitialState: function() {
    return {
      initialload: true,
      editing: false,
      focussed: false
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.refs.input) {
      this.resizeInput();
      var el = this.refs.input.getDOMNode();
      el.focus();

      // we only want to put the cursor at the end on the very first
      // editing action.
      if (!this.state.focussed) {
        if (typeof el.selectionStart === "number") {
          el.selectionStart = el.selectionEnd = el.value.length;
        } else if (typeof el.createTextRange !== "undefined") {
          var range = el.createTextRange();
          range.collapse(false);
          range.select();
        }
        this.setState({
          focussed: true
        });
      }

    } else {
      if (this.state.initialload) {
        this.setState({
          initialload: false
        });
      }
    }
  },

  resizeInput: function() {
    if (this.refs.input) {
      var input = this.refs.input.getDOMNode();
      var sizer = this.refs.sizer.getDOMNode();
      sizer.textContent = input.value;
      setTimeout(function() {
        if (sizer.scrollWidth > 5) {
          input.style.width = sizer.scrollWidth + "px";
        }
      }, 1);
    }
  },

  formInputStyle: function(style) {
    var inputStyle = assign({}, style);
    assign(inputStyle, {
      display: "inline-block",
      background: "transparent",
      border: "none",
      height: "100%",
      whiteSpace: "pre",
      margin: "-1px -4px -1px 1px"
    });
    return inputStyle;
  },

  makeEditable: function(content, style) {
    if (!this.state.editing) {
      return content;
    }

    var inputStyle = this.formInputStyle(style);

    var sizerstyle = assign({}, inputStyle);
    assign(sizerstyle, {
      opacity: 0,
      visibility: "hidden",
      background: "transparent",
      color: "transparent",
      zIndex: -1,
      width: "auto",
      height: "auto",
      position: "fixed",
      padding: "0 2px",
    });

    if(this.refs.sizer) {
      var sizer = this.refs.sizer.getDOMNode();
      inputStyle.width = sizer.scrollWidth;
    }

    return [
      this.state.initialload ? false : <input ref="input" style={inputStyle} hidden={this.state.initialload} onClick={this.killEvent} onKeyDown={this.checkForStop} onChange={this.onTextUpdate} value={content} />,
      <span ref="sizer" style={this.state.initialload ? inputStyle : sizerstyle}>{ content }</span>
    ];
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

  // if we see code 13, commit the text (enter code)
  checkForStop: function(evt) {
    if(evt.keyCode===13) {
      this.stopEditing();
    }
  },

  // send our current value up to our parent for handling
  onTextUpdate: function(evt) {
    this.resizeInput();
    var value = evt.target.value;
    this.props.updateText(value);
  },

  // public API: "flip between editing/not editing"
  toggleEditing: function() {
    this.setState({
      editing: !this.state.editing,
      focussed: (this.state.editing ? false : this.state.focussed)
    }, function() {
      this.props.setEditMode(this.state.editing);
      if(!this.state.editing) {
        this.onTextUpdate({
          target: {
            value: this.props.innerHTML.trim()
          }
        });
      }
    });
  },

  // public API: "start editing"
  startEditing: function() {
    if (!this.state.editing) {
      this.toggleEditing();
    }
  },

  // public API: "stop editing"
  stopEditing: function() {
    if (this.state.editing) {
      this.toggleEditing();
    }
  }
};

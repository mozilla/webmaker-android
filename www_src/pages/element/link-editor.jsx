var React = require('react/addons');
var Binding = require('../../lib/binding.jsx');
var ColorGroup = require('../../components/color-group/color-group.jsx');
var Range = require('../../components/range/range.jsx');
var getContrastingColor = require('../../lib/color').getContrastingColor;

var LinkEditor = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Binding
  ],
  getInitialState: function () {
    return {
      borderRadius: 5,
      backgroundColor: "#69A0FC",
      fontFamily: 'Roboto',
      innerHTML: 'Tap me'
    };
  },
  editText: function () {
    var text = window.prompt('Edit the text');
    this.setState({
      innerHTML: text
    });
  },
  render: function () {
    var tapStyle = {
      backgroundColor: this.state.backgroundColor,
      color: getContrastingColor(this.state.backgroundColor),
      boxShadow: "none",
      borderRadius: this.state.borderRadius,
      fontFamily: this.state.fontFamily
    };

    return (
      <div id="editor">
        <div className="editor-preview">
          <button className="btn" onClick={this.editText} style={tapStyle}>{this.state.innerHTML}</button>
        </div>
        <div className="editor-options">
          <div className="form-group">
            <button onClick={this.onChangeImageClick} className="btn btn-block">
              <img className="icon" src="../../img/change-image.svg" /> Set Link Destination
            </button>
          </div>
          <div className="form-group">
            <label>Corners</label>
            <Range id="borderRadius" min={0} value={this.state.borderRadius} max={32} unit="px" linkState={this.linkState} />
          </div>
          <div className="form-group">
            <label>Font</label>
            <select className="select" valueLink={this.linkState('fontFamily')}>
              <option value="Roboto">Roboto</option>
              <option value="Bitter">Bitter</option>
              <option value="Pacifico">Pacifico</option>
            </select>
          </div>
          <div className="form-group">
            <label>Background Color</label>
            <ColorGroup id="color" linkState={this.linkState} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LinkEditor;

var React = require('react/addons');
var Binding = require('../../lib/binding.jsx');
var ColorGroup = require('../../components/color-group/color-group.jsx');
var Range = require('../../components/range/range.jsx');
var Alert = require('../../components/alert/alert.jsx');

var ImageEditor = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Binding],
  getInitialState: function () {
    return {
      transparency: 70,
      borderWidth: 0,
      borderColor: 'transparent'
    };
  },
  onChangeImageClick: function () {
    this.refs.notImplementedWarning.show();
  },
  render: function () {
    var style = {
      opacity: this.state.transparency / 100,
      borderStyle: 'solid',
      borderWidth: this.state.borderWidth,
      borderColor: this.state.borderColor
    };
    return (
      <div id="editor">
        <div className="editor-preview">
          <img src="../../img/toucan.svg" style={style} />
        </div>
        <div className="editor-options">
          <div className="form-group">
            <button onClick={this.onChangeImageClick} className="btn btn-block"><img className="icon" src="../../img/change-image.svg" /> Change Image</button>
            <Alert ref="notImplementedWarning">Coming Soon!</Alert>
          </div>
          <div className="form-group">
            <label>Transparency</label>
            <Range id="transparency" linkState={this.linkState} />
          </div>
          <div className="form-group">
            <label>Border Width</label>
            <Range id="borderWidth" max={10} unit="px" linkState={this.linkState} />
          </div>
          <div className="form-group">
            <label>Border Color</label>
            <ColorGroup id="borderColor" linkState={this.linkState} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ImageEditor;

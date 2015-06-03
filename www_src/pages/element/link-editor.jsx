var React = require('react/addons');

var LinkBlock = require('../../components/el/types/link.jsx');
var ColorGroup = require('../../components/color-group/color-group.jsx');
var Slider = require('../../components/range/range.jsx');

var LinkEditor = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    require('./witheditable')
  ],
  getInitialState: function () {
    return LinkBlock.spec.flatten(this.props.element, {defaults: true});
  },
  componentDidUpdate: function (prevProps, prevState) {
    var state = this.state;

    // Update state if parent properties change
    if (this.props !== prevProps) {
      state = this.getInitialState();
      this.setState(state);
    }

    // Cache edits if internal state changes
    if (this.state !== prevState) {
      this.props.cacheEdits(state);
    }

  },
  onDestClick: function () {
    var metadata = {
      elementID: this.props.params.element,
      pageID: this.props.params.page,
      projectID: this.props.params.project
    };

    if (window.Android) {
      window.Android.setView(
        `/projects/${this.props.params.project}/link`,
        JSON.stringify(metadata)
      );
    }
  },
  render: function () {
    return (
      <div id="editor" onClick={this.stopEditing}>
        <div className="editor-preview">
          <LinkBlock {...this.state} ref="element" active={true} updateText={this.updateText} setEditMode={this.setEditing} />
        </div>
        <div className="editor-options">
          <div className="form-group">
            <button className="btn btn-block" onClick={this.editText}>{ this.state.editing? "Done" : "Edit Label"}</button>
          </div>
          <div className="form-group">
            <button onClick={this.onDestClick} className="btn btn-block">
              <img className="icon" src="../../img/change-image.svg" /> {this.state.targetPageId ? 'Change Link Destination' : 'Set Link Destination'}
            </button>
          </div>
          <div className="form-group">
            <label>Corners</label>
            <Slider id="borderRadius" min={0} value={this.state.borderRadius} max={32} unit="px" linkState={this.linkState} />
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
            <ColorGroup id="backgroundColor" linkState={this.linkState} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LinkEditor;

var React = require('react/addons');
var defaults = require('lodash.defaults');
var render = require('../../lib/render.jsx');
var Binding = require('../../lib/binding.jsx');

var TextBlock = require('../../blocks/text.jsx');
var Range = require('../../components/range/range.jsx');
var ColorGroup = require('../../components/color-group/color-group.jsx');
var {CheckboxSet, Radio} = require('../../components/option-panel/option-panel.jsx');


var textStyleOptions = [
  {
    id: 'fontWeight',
    icon: '../../img/B.svg',
    uncheckedLabel: 'normal',
    checkedLabel: 'bold'
  },
  {
    id: 'fontStyle',
    icon: '../../img/I.svg',
    uncheckedLabel: 'normal',
    checkedLabel: 'italic'
  },
  {
    id: 'textDecoration',
    icon: '../../img/U.svg',
    uncheckedLabel: 'none',
    checkedLabel: 'underline'
  }
];

var textAlignOptions = ['left', 'center', 'right'].map(e => {
  return {
    value: e,
    icon: '../../img/align-'+e+'.svg'
  };
});

var TextEditor = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    var props = this.props.element || {};
    return defaults(props, TextBlock.defaults);
  },
  componentDidUpdate: function () {
    this.props.save(this.state);
  },
  editText: function() {
    this.setState({
      editing: this.refs.element.toggleEditing()
    });
  },
  updateText: function (text) {
    this.setState({
      innerHTML: text
    });
  },
  render: function () {
    return (
      <div id="editor">
        <div className="editor-preview">
          <TextBlock {...this.state} ref="element" updateText={this.updateText} />
        </div>
        <div className="editor-options">
          <div className="form-group">
            <button className="btn btn-block" onClick={this.editText}>{ this.state.editing? "done" : "edit text"}</button>
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
            <label>Color</label>
            <ColorGroup id="color" linkState={this.linkState} />
          </div>
          <div className="form-group">
            <label>Text Style</label>
            <CheckboxSet options={textStyleOptions} linkState={this.linkState} />
          </div>
          <div className="form-group">
            <label>Text Alignment</label>
            <Radio id="textAlign" options={textAlignOptions} linkState={this.linkState} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TextEditor;

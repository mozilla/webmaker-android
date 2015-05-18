var React = require('react');
var render = require('../../lib/render.jsx');
var TextInput = require('../../components/text-input/text-input.jsx');

var ProjectSettings = React.createClass({
  onDoneClick: function () {
    // TODO : Wire up to Android menu
    console.log(this.refs.title.validate());
    console.log(this.refs.title.state.text);
  },
  render: function () {
    return (
      <div id="projectSettings">
        {/* TODO : Replace with header button in Android */}
        <button onClick={this.onDoneClick} style={{marginBottom: "20px"}}>✓</button>
        <TextInput ref="title" label="Title" maxlength={25} minlength={4} />
      </div>
    );
  }
});

render(ProjectSettings);

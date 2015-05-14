var React = require('react');
var render = require('../../lib/render.jsx');
var TextInput = require('../../components/text-input/text-input.jsx');

var ProjectSettings = React.createClass({
  render: function () {
    return (
      <div id="projectSettings">
        <TextInput label="Title" maxlength={25} />
      </div>
    );
  }
});

render(ProjectSettings);

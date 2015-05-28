var React = require('react/addons');

var api = require('../../lib/api');
var render = require('../../lib/render.jsx');
var router = require('../../lib/router.jsx');
var TextInput = require('../../components/text-input/text-input.jsx');

var ProjectSettings = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    router
  ],
  getInitialState: function () {
    return {
      title: ''
    };
  },
  componentWillMount: function () {
    var _this = this;

    // Build up URI for API requests
    var params = this.state.params;
    var uri = '/users/1/projects/' + params.project;

    // Fetch a fresh copy of the project's metadata & update state
    api({
      uri: uri
    }, function (err, body) {
      if (err) {
        // @todo Handle error state (GH-1922)
      }

      _this.setState({
        uri: uri,
        title: body.project.title
      });

      _this.refs.title.setState({
        inputLength: body.project.title.length
      });
    });
  },
  render: function () {
    return (
      <div id="projectSettings">
        <TextInput id="title" ref="title" label="Title" maxlength={25} minlength={4} linkState={this.linkState} />
        <button className="btn" onClick={this.onDoneClick} style={{marginBottom: "20px"}}>Save</button>
      </div>
    );
  },

  /**
   * Click handler for persisting changes to project settings.
   *
   * @return {void}
   */
  onDoneClick: function () {
    var _this = this;

    // @todo Client-side validation
    // console.log(_this.refs.title.validate());

    // Update project settings via the API
    api({
      method: 'PATCH',
      uri: _this.state.uri,
      json: {
        title: _this.state.title
      }
    }, function (err, body) {
      if (err) {
        // @todo Handle error state (GH-1922)
        console.error('Could not update project settings.');
      }

      // "Go back" to the previous activity
      if (window.Android) {
        window.Android.goBack();
      }
    });
  }
});

render(ProjectSettings);

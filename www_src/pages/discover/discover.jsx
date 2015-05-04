var React = require('react');
var render = require('../../lib/render.jsx');
var Binding = require('../../lib/binding.jsx');
var api = require('../../lib/api.js');
var ProjectSnapshot = require('../../components/project-snapshot/project-snapshot.jsx');

var Discover = React.createClass({
  mixins: [Binding],
  componentWillMount: function () {
    api({
      uri: '/c0645e6953e9949f8e5c/raw/'
    }, function (err, body) {
      console.dir(err);
      console.dir(body);
    });
  },
  render: function () {
    return (
      <div id="discover">
        <ProjectSnapshot
          url="/map/123"
          href="/pages/map"
          thumbnail="../../img/toucan.svg"
          title="The Birds of the Amazon"/>

        <ProjectSnapshot
          url="/map/123"
          href="/pages/map"
          thumbnail="../../img/toucan.svg"
          title="More birds"/>

        <ProjectSnapshot
          url="/map/123"
          href="/pages/map"
          thumbnail="../../img/toucan.svg"
          title="Cool stuff, yo"/>
      </div>
    );
  }
});

// Render!
render(Discover);

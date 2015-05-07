var React = require('react');
var render = require('../../lib/render.jsx');
var Binding = require('../../lib/binding.jsx');
var api = require('../../lib/api.js');
var Card = require('../../components/card/card.jsx');

var Make = React.createClass({
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
      <div id="make">
        <button className="btn btn-block btn-teal">+ Create a Project</button>
        <Card
          url="/projects/123"
          href="/pages/project"
          thumbnail="../../img/toucan.svg"
          title="The Birds of the Amazon" />

        <Card
          url="/projects/123"
          href="/pages/project"
          thumbnail="../../img/toucan.svg"
          title="More birds" />

        <Card
          url="/projects/123"
          href="/pages/project"
          thumbnail="../../img/toucan.svg"
          title="Cool stuff, yo" />
      </div>
    );
  }
});

// Render!
render(Make);

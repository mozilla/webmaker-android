var React = require('react');
var render = require('../../lib/render.jsx');
var Binding = require('../../lib/binding.jsx');
var api = require('../../lib/api.js');
var Card = require('../../components/card/card.jsx');
var Link = require('../../components/link/link.jsx');

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
        <Link url="/projects/new" href="/pages/project" className="btn btn-block btn-teal">
          + Create a Project
        </Link>
        
        <Card
          url="/projects/123"
          href="/pages/project"
          thumbnail="../../img/demo.png"
          title="The Birds of the Amazon" />
      </div>
    );
  }
});

// Render!
render(Make);

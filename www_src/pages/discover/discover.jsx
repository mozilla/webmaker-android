var React = require('react/addons');

var api = require('../../lib/api.js');
var render = require('../../lib/render.jsx');
var Card = require('../../components/card/card.jsx');

var Discover = React.createClass({
  mixins: [],
  getInitialState: function () {
    this.list = require('./mock.json');

    return {
      list: this.list
    };
  },
  render: function () {
    var cards = this.state.list.map( project => {
      return (
        <Card
          key={project.id}
          url={"/projects/" + project.id}
          href="/pages/project"
          thumbnail={project.thumbnail[480]}
          title={project.title}
          author={project.author.username} />
      );
    });

    return (
      <div id="discover">
        {cards}
      </div>
    );
  }
});

render(Discover);

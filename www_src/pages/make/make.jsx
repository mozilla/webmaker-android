var React = require('react');
var render = require('../../lib/render.jsx');
var api = require('../../lib/api.js');
var Card = require('../../components/card/card.jsx');
var Link = require('../../components/link/link.jsx');

var Make = React.createClass({
  mixins: [],
  getInitialState: function () {
    return {
      projects: []
    };
  },
  componentWillMount: function () {
    this.load();
  },
  componentDidUpdate: function (prevProps) {
    if (this.props.isVisible && !prevProps.isVisible) {
      this.load();
      console.log('restored!');
    }
  },
  load: function () {
    api({
      uri: '/users/1/projects'
    }, (err, body) => {
      if (err) return console.error('Error getting projects', err);
      if (!body || !body.projects) return console.log('No projects found');
      this.setState({
        projects: body.projects
      });
    });
  },
  render: function () {

    var cards = this.state.projects.map(project => {
      return (
        <Card
          key={project.id}
          url={"/projects/" + project.id}
          href="/pages/project"
          thumbnail={project.thumbnail[400]}
          title={project.title}
          author={project.author.username} />
      );
    });

    return (
      <div id="make">
        <Link url="/projects/new" href="/pages/project" className="btn btn-block btn-teal">
          + Create a Project
        </Link>
        {cards}
      </div>
    );
  }
});

// Render!
render(Make);

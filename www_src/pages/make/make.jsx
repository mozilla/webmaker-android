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
  addProject: function () {
    var defaultTitle = 'My project';
    var userInfo = {
      username: 'testuser'
    };

    api({
      method: 'post',
      uri: '/users/1/projects',
      json: {
        title: defaultTitle
      }
    }, (err, body) => {
      if (err) return console.error('Error creating a project');
      if (!body || !body.project) return console.log('No project');
      if (window.Android) {
        window.Android.setView('/projects/' + body.project.id);
      } else {
        this.setState({
          projects: [{
            id: body.project.id,
            title: defaultTitle,
            thumbnail: {},
            // todo
            author: userInfo
          }].concat(this.state.projects)
        });
      }
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
        <button onClick={this.addProject} className="btn btn-block btn-teal">
          + Create a Project
        </button>
        {cards}
      </div>
    );
  }
});

// Render!
render(Make);

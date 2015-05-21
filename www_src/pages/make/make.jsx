var React = require('react');
var render = require('../../lib/render.jsx');
var api = require('../../lib/api.js');
var Card = require('../../components/card/card.jsx');
var Loading = require('../../components/loading/loading.jsx');

var Make = React.createClass({
  mixins: [],
  getInitialState: function () {
    return {
      projects: [],
      loading: true
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
  onError: function (err) {
    console.error(err);
    this.setState({loading: false});
  },
  onEmpty: function () {
    console.log('No projects found');
    this.setState({loading: false});
  },
  load: function () {
    this.setState({loading: true});
    api({
      uri: '/users/1/projects'
    }, (err, body) => {
      if (err) {
        return this.onError(err);
      }

      if (!body || !body.projects || !body.projects.length) {
        return this.onEmpty();
      }

      this.setState({
        loading: false,
        projects: body.projects
      });
    });
  },
  addProject: function () {
    var defaultTitle = 'My project';
    var userInfo = {
      username: 'testuser'
    };
    this.setState({loading: true});
    api({
      method: 'post',
      uri: '/users/1/projects',
      json: {
        title: defaultTitle
      }
    }, (err, body) => {
      if (err) {
        return this.onError(err);
      }
      if (!body || !body.project) {
        return this.onEmpty();
      }
      if (window.Android) {
        window.Android.setView('/projects/' + body.project.id);
      }
      this.setState({
        loading: false,
        projects: [{
          id: body.project.id,
          title: defaultTitle,
          thumbnail: {},
          // todo
          author: userInfo
        }].concat(this.state.projects)
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
        <button onClick={this.addProject} className="btn btn-block btn-teal">
          + Create a Project
        </button>
        {cards}
        <Loading on={this.state.loading} />
      </div>
    );
  }
});

// Render!
render(Make);

var React = require('react/addons');

var api = require('../../lib/api.js');
var render = require('../../lib/render.jsx');
var Card = require('../../components/card/card.jsx');
var Loading = require('../../components/loading/loading.jsx');

var Discover = React.createClass({
  mixins: [],
  getInitialState: function () {
    return {
      projects: [],
      loading: true
    };
  },
  load: function () {
    api({
      uri: '/discover',
      useCache: true
    }, (err, body) => {
      if (err) {
        return console.error('Error getting discovery projects', err);
      }
      
      if (!body || !body.projects || !body.projects.length) {
        return console.log('No discovery projects found');
      }
      
      this.setState({
        projects: body.projects,
        loading: false
      });
    });
  },
  componentWillMount: function () {
    this.load();
  },
  render: function () {
    var cards = this.state.projects.map( project => {
      return (
        <Card
          key={project.id}
          url={"/users/" + project.author.id + "/projects/" + project.id + '/play'}
          href="/pages/project"
          thumbnail={project.thumbnail[320]}
          title={project.title}
          author={project.author.username} />
      );
    });

    return (
      <div id="discover">
        {cards}
        <div hidden={this.state.loading || this.state.projects}>Sorry, no projects found.</div>
        <Loading on={this.state.loading} />
      </div>
    );
  }
});

render(Discover);

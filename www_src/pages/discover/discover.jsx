var React = require('react/addons');
var ImageLoader = require('react-imageloader');

var api = require('../../lib/api.js');
var render = require('../../lib/render.jsx');
var Link = require('../../components/link/link.jsx');

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
        <Link url={"/map/" + project.id} href="/pages/map" key={project.id} className="card">
          <div className="thumbnail">
            <ImageLoader src={project.thumbnail[480]}>
              // @todo Show image error icon / graphic
            </ImageLoader>
          </div>

          <div className="meta">
            <div className="title">{project.title}</div>
            <div className="author">{project.author.username}</div>
          </div>
        </Link>
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

var React = require('react/addons');
var api = require('../../lib/api.js');
var render = require('../../lib/render.jsx');
var Link = require('../../components/link/link.jsx');

var Discover = React.createClass({
  mixins: [],
  getInitialState: function () {
    this.list = [];

    return {
      list: this.list,
      offset: 0,
      limit: 10,
      locale: {
        language: 'en',
        country: 'us'
      }
    };
  },
  componentWillMount: function () {
    api({
      uri: '/c0645e6953e9949f8e5c/raw/'
    }, function (err, body) {
      // @todo Handle error state
      if (!this.isMounted()) return;

      // Update list
      this.list = this.list.concat(body);
      this.setState({
        list: this.list
      });
    }.bind(this));
  },
  onClick: function () {
    // this.setState({test: !this.state.test});
  },
  render: function () {
    var cards = [];

    console.dir(this.state.list);
    for (var i = 0; i < this.state.list.length; i++) {
      cards.push(
        <Link url="/map/123" href="/pages/map" class="card">
          <div class="thumbnail">
            <img src="" />
          </div>

          <div class="meta">
            {this.state.list[i].foo}
          </div>
        </Link>
      );
    }

    return (
      <div id="discover">
        {cards}
      </div>
    );
  }
});

// Render!
render(Discover);

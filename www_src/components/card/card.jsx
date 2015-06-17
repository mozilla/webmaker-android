var React = require('react/addons');
var ImageLoader = require('react-imageloader');
var Link = require('../link/link.jsx');

var Card = React.createClass({
  statics: {
    DEFAULT_THUMBNAIL: '../../img/default.svg'
  },
  actionsClicked: function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onActionsClick.call(this, this.props);
  },
  prerenderImage: function() {
    return React.createElement('img', {
      src: Card.DEFAULT_THUMBNAIL
    });
  },
  render: function () {
    return (
      <Link url={this.props.url} href={this.props.href} className="card">
        <div className="thumbnail">
          <ImageLoader src={this.props.thumbnail || Card.DEFAULT_THUMBNAIL} preloader={this.prerenderImage}></ImageLoader>
        </div>

        <div className="meta">
          <div className="text">
            <div className="title">{this.props.title}</div>
            <div className="author">{this.props.author}</div>
          </div>
          <div className="action" hidden={!this.props.showButton}>
            <button onClick={this.actionsClicked}>
              <img src="../../img/more-dots.svg"/>
            </button>
          </div>
        </div>
      </Link>
    );
  }
});

module.exports = Card;

var React = require('react/addons');
var ImageLoader = require('react-imageloader');
var Link = require('../link/link.jsx');
var classNames = require('classnames');

var Card = React.createClass({
  render: function () {
    return (
      <Link url={this.props.url} href={this.props.href} className="card">
        <div className={classNames('thumbnail', {placeholder: !this.props.thumbnail})}>
          <ImageLoader src={this.props.thumbnail}></ImageLoader>
        </div>

        <div className="meta">
          <div className="title">{this.props.title}</div>
          <div className="author">{this.props.author}</div>
        </div>
      </Link>
    );
  }
});

module.exports = Card;

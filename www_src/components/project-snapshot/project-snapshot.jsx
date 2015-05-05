var React = require('react/addons');
var Link = require('../link/link.jsx');

var ProjectSnapshot = React.createClass({
  render: function () {
    return (
      <Link url={this.props.url} href={this.props.href} className="project-snapshot project-snapshot-demo">
        <div className="inner">
          <div className="img">
            <img src={this.props.thumbnail} />
          </div>
        </div>
        <div className="metadata">
          <div className="title">{this.props.title}</div>
        </div>
      </Link>
    );
  }
});

module.exports = ProjectSnapshot;

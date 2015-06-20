var React = require('react');
var classNames = require('classnames');

var Link = require('../../components/link/link.jsx');

var PageControls = React.createClass({
  secondaryButtonClass: function(name) {
    var names = {
      secondary: true,
      active: this.props.currentElementId > -1 && !this.props.showAddMenu
    };
    names[name] = true;
    return classNames(names);
  },

  render: function() {
    return (
      <div className={classNames({'controls': true, 'add-active': this.props.showAddMenu})}>
        <div className="add-menu">
          <button className="text"  onClick={this.props.addElement('text')} ><img className="icon" src="../../img/text.svg" /></button>
          <button className="image" onClick={this.props.addElement('image')}><img className="icon" src="../../img/camera.svg" /></button>
          <button className="link"  onClick={this.props.addElement('link')} ><img className="icon" src="../../img/link.svg" /></button>
        </div>
        <button className={this.secondaryButtonClass("delete")} onClick={this.props.deleteElement} active={this.props.currentElementId===-1}>
          <img className="icon" src="../../img/trash.svg" />
        </button>
        <button className="add" onClick={this.props.toggleAddMenu}></button>
        <Link
          className={this.secondaryButtonClass("edit")}
          url={this.props.url}
          href={this.props.href}>
          <img className="icon" src="../../img/brush.svg" />
        </Link>
      </div>
    );
  }
});

module.exports = PageControls;

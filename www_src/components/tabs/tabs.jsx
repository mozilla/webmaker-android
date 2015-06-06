var React = require('react');
var classNames = require('classnames');

var Tabs = React.createClass({
  getInitialState: function () {
    return {
      selectedIndex: 0
    };
  },
  setTab: function (i) {
    return () => {
      this.setState({selectedIndex: i});
    };
  },
  render: function () {
    var className = classNames('tabs', this.props.className);
    var tabs = this.props.tabs;
    return (<div className={className}>
      <ul className="tab-menu">
        {tabs.map((tab, i) => {
          var className = classNames({
            'tab-btn': true,
            'selected': this.state.selectedIndex === i
          });
          return (<li key={tab.title}><button className={className} onClick={this.setTab(i)}><span className="sr-only">{tab.title}</span>{tab.menu}</button></li>);
        })}
      </ul>
      <div className="tab-content">
        {tabs.map((tab, i) => {
          var className = classNames({
            'tab-body': true,
            'selected': this.state.selectedIndex === i
          });
          return (<div key={tab.title} className={className}>{tab.body}</div>);
        })}
      </div>
    </div>);
  }
});

module.exports = Tabs;

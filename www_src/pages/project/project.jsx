var React = require('react');
var classNames = require('classnames');
var render = require('../../lib/render.jsx');
var Binding = require('../../lib/binding.jsx');

var Link = require('../../components/link/link.jsx');

var Positionable = require('./positionable.jsx');
var Generator = require('./blocks/generator');

var Project = React.createClass({

  mixins: [Binding],

  getInitialState: function() {
    return {
      content: [],
      currentElement: -1,
      showAddMenu: false
    };
  },

  render: function () {
    var shadows = this.shadows ? this.shadows : this.formShadows(this.state.content);
    var positionables = this.formPositionables(this.state.content);
    return <div id="project" className="demo">
      <div className="pages-container">
        <div className="page next top" />
        <div className="page next right" />
        <div className="page next bottom" />
        <div className="page next left" />
        <div className="page">
          <div className="shadows">{ shadows }</div>
          <div className="inner">
            <div className="positionables">{ positionables }</div>
          </div>
        </div>
      </div>

      <div className="controls">
        <div className={classNames({'add-menu': true, 'active': this.state.showAddMenu})}>
          <button className="text" onClick={this.addText}>Aa</button>
          <button className="image" onClick={this.addImage}>Image</button>
          <button className="link" onClick={this.addLink}>&lt;a&gt;</button>
        </div>
        <button className="add" onClick={this.toggleAddMenu}>+</button>
        <button className="edit" onClick={this.editCurrent}>+</button>
      </div>
      <Link ref="editlink" url={ "/projects/123/elements/" + this.state.currentElement } href="/pages/editor" hidden={true}>edit</Link>
    </div>
  },

  toggleAddMenu: function () {
    this.setState({showAddMenu: !this.state.showAddMenu});
  },

  formShadows: function(content) {
    this.shadows = content.map((m, i) => {
      var element = Generator.generateBlock(m);
      return <div>
        <Positionable ref={"shadow"+i} key={"shadow"+i} {...m} interactive={false}>
          {element}
        </Positionable>
      </div>;
    });
    return this.shadows;
  },

  formPositionables: function(content) {
    return content.map((m, i) => {
      var element = Generator.generateBlock(m);
      return <div>
        <Positionable ref={"positionable"+i} key={"positionable"+i} {...m} current={this.state.currentElement===i} onUpdate={this.updateElement(i)}>
          {element}
        </Positionable>
      </div>;
    });
  },

  updateElement: function(index) {
    return function(data) {
      var content = this.state.content;
      var entry = content[index];
      Object.keys(data).forEach(k => entry[k] = data[k]);
      var ref = this.refs["shadow"+index];
      if (ref) ref.setTransform(data);
      this.setState({ currentElement: index });
    }.bind(this);
  },

  editCurrent: function() {
    if (this.currentElement === -1) return;
    var entry = this.state.content[this.state.currentElement];
    var link = this.refs.editlink;
    link.getDOMNode().click();
  },

  append: function(obj) {
    this.shadows = false;
    this.setState({
      content: this.state.content.concat([obj])
    });
  },

  addLink: function() {
    this.append(Generator.generateDefinition(Generator.LINK, {
      href: "https://webmaker.org",
      label: "webmaker.org",
      active: false
    }));
  },

  addText: function() {
    this.append(Generator.generateDefinition(Generator.TEXT, {
      value: "This is a paragraph of text"
    }));
  },

  addImage: function() {
    this.append(Generator.generateDefinition(Generator.IMAGE, {
      src: "../../img/toucan.svg",
      alt: "This is Tucker"
    }));
  },

  save: function() {
    return JSON.stringify(this.state.content);
  },

  saveToString: function() {
    prompt("Content data:", this.save())
  },

  load: function(content) {
    this.setState({
      content: content
    }, function() {
      console.log("restored state");
    });
  },

  loadFromString: function() {
    var data = prompt("Content data:");
    try {
      var content = JSON.parse(data);
      this.load(content);
    } catch (e) {
      console.error("could not parse data as JSON");
    }
  }
});

// Render!
render(Project);

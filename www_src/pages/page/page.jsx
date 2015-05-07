var React = require('react');
var classNames = require('classnames');
var render = require('../../lib/render.jsx');
var Router = require('../../lib/router.js');
var api = require('../../lib/api.js');

var Link = require('../../components/link/link.jsx');

var Positionable = require('./positionable.jsx');
var Generator = require('./blocks/generator');

var Project = React.createClass({

  mixins: [Router],

  getInitialState: function() {
    return {
      content: [],
      currentElement: -1,
      showAddMenu: false,
      params: this.getRouteParams()
    };
  },

  componentWillMount: function() {
    if (this.state.params.page) {
      api({
        uri: '/users/foo/projects/bar/pages/' + this.state.params.page
      }, (err, data) => {
        this.load(data.elements);
      });
    }

    this.dims = {
      width: 0,
      height: 0
    };
  },

  componentDidUpdate: function () {
    // This will need to happen less frequently
    // When we are hitting a real API server
    this.save();
  },

  render: function () {
    var content = this.state.content;
    var currentElement = this.state.currentElement;
    var currentElementType = content[currentElement] ? content[currentElement].type : '';

    var positionables = this.formPositionables(this.state.content);
    var secondaryClass = (name => {
      var names = {
        secondary: true,
        active: this.state.currentElement > -1 && !this.state.showAddMenu
      };
      names[name] = true;
      return classNames(names);
    });

    // Url for link to element editor
    var href = '';
    var url = '';
    var currentEl = this.state.content[this.state.currentElement];
    if (typeof currentEl !== 'undefined') {
      href = '/pages/element/#' + currentEl.type;
      url =  '/projects/123/pages/' + this.state.params.page + '/elements/' + this.state.currentElement + '/editor/' + currentEl.type;
    }

    return <div id="project" className="demo">
      <div className="pages-container">
        <div className="page next top" />
        <div className="page next right" />
        <div className="page next bottom" />
        <div className="page next left" />
        <div className="page">
          <div className="inner">
            <div ref="container" className="positionables">{ positionables }</div>
          </div>
        </div>
      </div>

      <div className={classNames({overlay: true, active: this.state.showAddMenu})}/>

      <div className={classNames({'controls': true, 'add-active': this.state.showAddMenu})}>
        <div className="add-menu">
          <button className="text" onClick={this.addText}><img className="icon" src="../../img/text.svg" /></button>
          <button className="image" onClick={this.addImage}><img className="icon" src="../../img/camera.svg" /></button>
          <button className="link" onClick={this.addLink}><img className="icon" src="../../img/link.svg" /></button>
        </div>
        <button className={secondaryClass("delete")} onClick={this.deleteElement} active={this.state.currentElement===-1}>
          <img className="icon" src="../../img/trash.svg" />
        </button>
        <button className="add" onClick={this.toggleAddMenu}></button>
        <Link
          className={ secondaryClass("edit") }
          url={url}
          href={href}>
          <img className="icon" src="../../img/brush.svg" />
        </Link>
      </div>
    </div>
  },

  componentDidMount: function() {
    var bbox = this.refs.container.getDOMNode().getBoundingClientRect();
    if(bbox) {
      this.dims = bbox;
    }
  },

  toggleAddMenu: function () {
    this.setState({showAddMenu: !this.state.showAddMenu});
  },

  formPositionables: function(content) {
    return content.map((props, i) => {
      if (props === false) {
        return false;
      }
      props.parentWidth = this.dims.width;
      props.parentHeight = this.dims.height;
      var element = Generator.generateBlock(props);
      return <div>
        <Positionable ref={"positionable"+i} key={"positionable"+i} {...props} current={this.state.currentElement===i} onUpdate={this.updateElement(i)}>
          {element}
        </Positionable>
      </div>;
    });
  },

  appendElement: function(obj) {
    this.setState({
      content: this.state.content.concat([obj]),
      showAddMenu: false
    });
  },

  updateElement: function(index) {
    return function(data) {
      var content = this.state.content;
      var entry = content[index];
      Object.keys(data).forEach(k => entry[k] = data[k]);
      this.setState({ currentElement: index });
    }.bind(this);
  },

  deleteElement: function() {
    if(this.state.currentElement === -1) return;
    var content = this.state.content;
    content[this.state.currentElement] = false;
    // note that we do not splice, because the updateElement
    // function relies on immutable array indices.
    this.setState({
      content: content,
      currentElement: -1
    });
  },

  addLink: function() {
    this.appendElement(Generator.generateDefinition(Generator.LINK, {
      href: "https://webmaker.org",
      label: "webmaker.org",
      active: false
    }));
  },

  addText: function() {
    this.appendElement(Generator.generateDefinition(Generator.TEXT, {
      value: "This is a paragraph of text"
    }));
  },

  addImage: function() {
    this.appendElement(Generator.generateDefinition(Generator.IMAGE, {
      src: "../../img/toucan.svg",
      alt: "This is Tucker"
    }));
  },

  save: function() {
    console.log(this.state.params);
    api({
      method: 'put',
      uri: '/users/foo/projects/bar/pages/' + this.state.params.page,
      json: {
        elements: this.state.content
      }
    }, function () {
      console.log('saved!');
    });
  },

  saveToString: function() {
    prompt("Content data:", JSON.stringify(this.state.content));
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

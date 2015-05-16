var React = require('react');
var classNames = require('classnames');
var render = require('../../lib/render.jsx');
var router = require('../../lib/router.jsx');
var api = require('../../lib/api.js');
var uuid = require('../../lib/uuid.js');

var Link = require('../../components/link/link.jsx');
var Generator = require('../../blocks/generator');

var Positionable = require('./positionable.jsx');

var Page = React.createClass({

  mixins: [router],

  getInitialState: function() {
    return {
      elements: [],
      currentElement: -1,
      showAddMenu: false,
      dims: {
        width: 0,
        height: 0
      }
    };
  },

  componentWillMount: function() {
    this.load();
  },

  componentDidUpdate: function (prevProps) {
    if (this.props.isVisible && !prevProps.isVisible) {
      this.load();
      console.log('restored!');
    } else {
      // This will need to happen less frequently
      // When we are hitting a real API server
      this.save();
    }
  },

  render: function () {
    var elements = this.state.elements;
    var currentElement = this.state.currentElement;
    var currentElementType = elements[currentElement] ? elements[currentElement].type : '';

    var positionables = this.formPositionables(elements);
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
    var currentEl = elements[this.state.currentElement];
    if (typeof currentEl !== 'undefined') {
      href = '/pages/element/#' + currentEl.type;
      url =  '/projects/123/pages/' + this.state.params.page + '/elements/' + currentEl.id + '/editor/' + currentEl.type;
    }

    return <div id="project" className="demo">
      <div className="pages-container">
        <div className="page next top" />
        <div className="page next right" />
        <div className="page next bottom" />
        <div className="page next left" />
        <div className="page">
          <div className="inner" style={{backgroundColor: this.state.style.backgroundColor}}>
            <div ref="container" className="positionables">{ positionables }</div>
          </div>
        </div>
      </div>

      <div className={classNames({overlay: true, active: this.state.showAddMenu})} onClick={this.toggleAddMenu}/>

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
      this.setState({
        dims: bbox
      });
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

      props.parentWidth = this.state.dims.width;
      props.parentHeight = this.state.dims.height;

      var Element = Generator.blocks[props.type];

      props.ref = "positionable"+i;
      props.key = "positionable"+i;
      props.current = this.state.currentElement===i;
      return <div>
        <Positionable {...props} onUpdate={this.updateElement(i)}>
          <Element {...props} />
        </Positionable>
      </div>;
    });
  },

  appendElement: function(obj) {
    this.setState({
      currentElement: this.state.elements.length,
      elements: this.state.elements.concat([obj]),
      showAddMenu: false
    });
  },

  updateElement: function(index) {
    return function(data) {
      var elements = this.state.elements;
      var entry = elements[index];
      Object.keys(data).forEach(k => entry[k] = data[k]);
      this.setState({
        elements: elements,
        currentElement: index
      });
    }.bind(this);
  },

  deleteElement: function() {
    if(this.state.currentElement === -1) return;
    var elements = this.state.elements;
    elements[this.state.currentElement] = false;
    // note that we do not splice, because the updateElement
    // function relies on immutable array indices.
    this.setState({
      elements: elements,
      currentElement: elements.length - 1
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
    // FIXME: TODO: this needs to be split into "cache this page's current running state" vs.
    //              "only get the data relevan to for saving this page to db".
    api({
      method: 'put',
      uri: '/users/foo/projects/bar/pages/' + this.state.params.page,
      json: this.state
    });

  },

  load: function() {
    var id = this.state.params.page || 'foo0';
    api({
      uri: '/users/foo/projects/bar/pages/' + id
    }, (err, cachedState) => {
      console.log(cachedState);
      if (!cachedState || Object.keys(cachedState).length === 0) return;
      // FIXME: TODO: this needs to be split into "loading the page's previous running state" vs.
      //              "build page based on project stored in db".
      this.setState(cachedState);
    });
  }
});

// Render!
render(Page);

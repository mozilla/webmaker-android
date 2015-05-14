var React = require('react');
var classNames = require('classnames');
var render = require('../../lib/render.jsx');
var router = require('../../lib/router.jsx');
var api = require('../../lib/api.js');
var uuid = require('../../lib/uuid.js');

var Link = require('../../components/link/link.jsx');
var Generator = require('../../blocks/generator');
var blocks = Generator.blocks;
var Positionable = require('./positionable.jsx');

var Page = React.createClass({

  mixins: [router],

  uri: function () {
    var params = this.state.params;
    return `/users/1/projects/${params.project}/pages/${params.page}`;
  },

  getInitialState: function() {
    return {
      elements: [],
      styles: {},
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
      var params = this.state.params;
      url = `/projects/${params.project}/pages/${params.page}/elements/${currentEl.id}/editor/${currentEl.type}`;
    }

    return <div id="project" className="demo">
      <div className="pages-container">
        <div className="page next top" />
        <div className="page next right" />
        <div className="page next bottom" />
        <div className="page next left" />
        <div className="page">
          <div className="inner" style={{backgroundColor: this.state.styles.backgroundColor}}>
            <div ref="container" className="positionables">{ positionables }</div>
          </div>
        </div>
      </div>

      <div className={classNames({overlay: true, active: this.state.showAddMenu})} onClick={this.toggleAddMenu}/>

      <div className={classNames({'controls': true, 'add-active': this.state.showAddMenu})}>
        <div className="add-menu">
          <button className="text" onClick={this.addElement('text')}><img className="icon" src="../../img/text.svg" /></button>
          <button className="image" onClick={this.addElement('image')}><img className="icon" src="../../img/camera.svg" /></button>
          <button className="link" onClick={this.addElement('link')}><img className="icon" src="../../img/link.svg" /></button>
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

  addElement: function(type) {
    return () => {
      var json = Generator.generateDefinition(type);

      api({method: 'post', uri: this.uri() + '/elements', json}, (err, data) => {
        var state = {showAddMenu: false};
        if (err) console.log('There was an error creating an element', err);
        if (data && data.element) {
          json.id = data.element.id;
          state.elements = this.state.elements.concat([this.flatten(json)]);
          state.currentElement = this.state.elements.length,
        }
        this.setState(state);
      });
    };
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
    var id = elements[this.state.currentElement].id;

    // Don't delete test elements for real;
    if (parseInt(id, 10) <= 3) return alert('this is a test element, not deleting.');

    api({method: 'delete', uri: this.uri() + '/elements/' + id}, (err, data) => {
      if (err) return console.error('There was a problem deleting the element');
      elements[this.state.currentElement] = false;
      var currentElement = -1;
      elements.some(function(e,idx) {
        currentElement = idx;
        return !!e;
      });
      this.setState({
        elements: elements,
        currentElement: -1
      });
    });
  },

  save: function() {
    // todo
  },

  flatten: function (element) {
    if (!blocks[element.type]) return false;
    return blocks[element.type].spec.flatten(element);
  },

  load: function() {
    var id = this.state.params.page || 'foo0';
    api({
      uri: this.uri()
    }, (err, data) => {
      if (err) return console.error('There was an error getting the Page', err);
      if (!data && !data.page) console.log('Could not find the page');

      var page = data.page;
      var styles = page.styles;
      var elements = page.elements.map(element => {
        return this.flatten(element);
      }).filter(element => element);
      this.setState({
        styles,
        elements
      });
    });
  }
});

// Render!
render(Page);

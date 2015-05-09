var React = require('react/addons');
var update = React.addons.update;
var assign = require('react/lib/Object.assign');
var classNames = require('classnames');

var render = require('../../lib/render.jsx');
var router = require('../../lib/router.jsx');
var Cartesian = require('../../lib/cartesian');
var Link = require('../../components/link/link.jsx');
var {Menu, PrimaryButton, SecondaryButton} = require('../../components/action-menu/action-menu.jsx');
var blocks = require('../../blocks/generator').blocks;

var api = require('../../lib/api');

var MAX_ZOOM = 0.8;
var MIN_ZOOM = 0.18;
var DEFAULT_ZOOM = 0.5;
var ZOOM_SENSITIVITY = 300;

var Page = React.createClass({
  render: function () {
    var classes = classNames('page-container', {
      selected: this.props.selected,
      unselected: this.props.unselected
    });
    var style = {
      backgroundColor: this.props.page.style.backgroundColor,
      transform: this.props.transform
    };

    // Build element tree
    var elements = this.props.page.elements.map(props => {
      if (!blocks[props.type]) return;
      var Component = blocks[props.type];
      return <Component position={true} {...props} />;
    });

    return (<div className={classes} style={style} onClick={this.props.onClick}>
      {elements}
    </div>);
  }
});

var Project = React.createClass({
  mixins: [router],
  getInitialState: function () {
    return {
      selectedEl: '',
      elements: [],
      camera: {
        x: 0,
        y: 0
      },
      zoom: DEFAULT_ZOOM
    };
  },

  load: function () {
    api({uri: '/users/foo/projects/bar/pages'}, (err, pages) => {
      this.cartesian.allCoords = pages.map(el => el.coords);
      this.setState({
        elements: pages,
        camera: this.cartesian.getFocusTransform({x: 0, y: 0}, this.state.zoom),
      });
    });
  },

  componentWillMount: function () {

    var width = 320;
    var height = 440;
    var gutter = 20;

    this.cartesian = new Cartesian({
      allCoords: [],
      width,
      height,
      gutter
    });
    this.load();
  },

  componentDidUpdate: function (prevProps) {
    if (this.props.isVisible && !prevProps.isVisible) {
      this.load();
      console.log('restored!');
    }
  },

  componentDidMount: function () {
    var el = this.getDOMNode();
    var bounding = this.refs.bounding;
    var boundingEl = bounding.getDOMNode();
    var startX, startY, startDistance, currentX, currentY, currentZoom;
    var didMove = false;

    el.addEventListener('touchstart', (event) => {
      console.log('start', event.touches.length);
      didMove = false;

      if (event.touches.length > 1) {
        var dx = event.touches[1].clientX - event.touches[0].clientX;
        var dy = event.touches[1].clientY - event.touches[0].clientY;
        startDistance = Math.sqrt(dx*dx + dy*dy);
      } else {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        boundingEl.style.transition = 'none';
      }

    });

    el.addEventListener('touchmove', (event) => {
      console.log('touchmove', event.touches.length);
      didMove = true;
      var translateStr = 'translate(' + this.state.camera.x + 'px, ' + this.state.camera.y + 'px)';
      var scaleStr = 'scale(' + this.state.zoom + ')';
      var center;
      if (event.touches.length > 1) {
        currentZoom = this.state.zoom;
        var dx = event.touches[1].clientX - event.touches[0].clientX
        var dy = event.touches[1].clientY - event.touches[0].clientY;
        var distance = Math.sqrt(dx*dx + dy*dy);

        currentZoom = currentZoom + ((distance - startDistance) / ZOOM_SENSITIVITY);
        currentZoom = Math.min(Math.max(currentZoom, MIN_ZOOM), MAX_ZOOM);
        scaleStr = 'scale(' + currentZoom + ')';
      }

      var x = this.state.camera.x;
      var y = this.state.camera.y;
      currentX = x + (event.touches[0].clientX - startX);
      currentY = y + (event.touches[0].clientY - startY);
      translateStr = 'translate(' + currentX + 'px, ' + currentY + 'px)';
      boundingEl.style.transform = translateStr + ' ' + scaleStr;
    });

    el.addEventListener('touchend', (event) => {
      console.log('end', event.touches.length, event);
      if (event.touches.length === 0) {
        boundingEl.style.transition = '';
        if (!didMove) return;

        var state = {camera: {
          x: currentX,
          y: currentY
        }};
        if (typeof currentZoom !== 'undefined') state.zoom = currentZoom;
        this.setState(state);
        startX, startY, startDistance, currentX, currentY, currentZoom = undefined;
      } else {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        this.state.camera.x = currentX;
        this.state.camera.y = currentY;
        this.state.zoom = currentZoom;
      }

    });
  },
  selectPage: function (el) {
    return () => {
      this.setState({
        camera: this.cartesian.getFocusTransform(el.coords, this.state.zoom),
        selectedEl: el.id
      });
    };
  },
  zoomOut: function () {
    this.setState({zoom: this.state.zoom / 2});
  },
  zoomIn: function () {
    this.setState({zoom: this.state.zoom * 2});
  },
  addPage: function (coords) {
    return () => {
      api({method: 'post', uri:'/users/foo/projects/bar/pages', json: {
        coords: coords,
        style: {backgroundColor: '#FFFFFF'},
        elements: []
      }}, (err, newEl) => {
        this.cartesian.allCoords.push(coords);
        this.setState({
          elements: update(this.state.elements, {$push: [newEl]}),
          camera: this.cartesian.getFocusTransform(coords, this.state.zoom),
          selectedEl: newEl.id
        })
      });
    };
  },
  removePage: function () {
    var index;
    this.state.elements.forEach((el, i) => {
      if (el.id === this.state.selectedEl) index = i;
    });
    if (typeof index === 'undefined') return;

    api({method: 'delete', uri:'/users/foo/projects/bar/pages/' + this.state.selectedEl}, (err) => {
      this.cartesian.allCoords.splice(index, 1);
      this.setState({
        elements: update(this.state.elements, {$splice: [[index, 1]]}),
        zoom: this.state.zoom >= MAX_ZOOM ? DEFAULT_ZOOM : this.state.zoom,
        selectedEl: ''
      });
    });

  },
  render: function () {
    var containerStyle = {
      width: this.cartesian.width + 'px',
      height: this.cartesian.height + 'px'
    };

    var boundingStyle = assign({
        transform: `translate(${this.state.camera.x}px, ${this.state.camera.y}px) scale(${this.state.zoom})`,
        opacity: this.state.elements.length ? 1 : 0
      },
      this.cartesian.getBoundingSize()
    );

    var projectId = this.state.params.project || 123;
    var pageUrl = `projects/${projectId}/pages/${this.state.selectedEl}`;

    return (
      <div id="map">

        <div style={{opacity: this.state.elements.length ? 0 : 1}}>
          Loading...
        </div>

        <div ref="bounding" className="bounding" style={boundingStyle}>
          <div className="test-container" style={containerStyle}>
          {this.state.elements.map((page) => {
            var props = {
              page,
              selected: page.id === this.state.selectedEl,
              transform: this.cartesian.getTransform(page.coords),
              onClick: this.selectPage(page)
            };
            return (<Page {...props} />);
          })}
          {this.cartesian.edges.map(coords => {
            return (<div className="page-container add" style={{transform: this.cartesian.getTransform(coords)}} onClick={this.addPage(coords)}>
              <img className="icon" src="../../img/plus.svg" />
            </div>);
          })}
          </div>
        </div>

        <Menu>
          <SecondaryButton side="right" off={!this.state.selectedEl} onClick={this.removePage} icon="../../img/trash.svg" />
          <PrimaryButton url={pageUrl}  off={!this.state.selectedEl} href="/pages/page" icon="../../img/pencil.svg" />
        </Menu>
      </div>
    );
  }
});

render(Project);

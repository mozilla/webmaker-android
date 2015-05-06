var React = require('react/addons');
var update = React.addons.update;
var assign = require('react/lib/Object.assign');
var classNames = require('classnames');

var render = require('../../lib/render.jsx');
var router = require('../../lib/router.jsx');
var Cartesian = require('../../lib/cartesian');

var Link = require('../../components/link/link.jsx');
var {Menu, PrimaryButton, SecondaryButton} = require('../../components/action-menu/action-menu.jsx');

var api = require('../../lib/api');

var Map = React.createClass({
  mixins: [router],
  getInitialState: function () {
    return {
      selectedEl: '',
      elements: [],
      camera: {
        x: 0,
        y: 0
      },
      zoom: 0.5
    };
  },
  componentWillMount: function () {
    console.log('--------------');
    console.dir(this.state.route);
    console.dir(this.state.route.project);
    console.log('--------------');

    var width = 300;
    var height = 380;
    var gutter = 20;

    this.cartesian = new Cartesian({
      allCoords: [],
      width,
      height,
      gutter
    });
    api({uri: '/users/foo/projects/bar/pages'}, (err, pages) => {
      this.cartesian.allCoords = pages.map(el => el.coords);
      this.setState({
        elements: pages,
        camera: this.cartesian.getFocusTransform({x: 0, y: 0}),
      });
    });
  },

  componentDidMount: function () {
    var el = this.getDOMNode();
    var bounding = this.refs.bounding;
    var boundingEl = bounding.getDOMNode();
    var scaleEl = this.refs.scaler.getDOMNode();
    var isZoom, startX, startY, startDistance, deltaX, deltaY, currentZoom;
    var didMove = false;
    var ZOOM_SENSITIVITY = 300;

    el.addEventListener('touchstart', (event) => {
      didMove = false;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      boundingEl.style.transition = 'none';
      scaleEl.style.transition = 'none';

      if (event.touches.length > 1) {
        isZoom = true;
        var dx = event.touches[1].clientX - startX;
        var dy = event.touches[1].clientY - startY;
        startDistance = Math.sqrt(dx*dx + dy*dy);
      } else {
        isZoom = false;
      }

    });

    el.addEventListener('touchmove', (event) => {
      didMove = true;
      if (isZoom && event.touches.length > 1) {
        currentZoom = this.state.zoom;
        var dx = event.touches[1].clientX - event.touches[0].clientX
        var dy = event.touches[1].clientY - event.touches[0].clientY;
        var distance = Math.sqrt(dx*dx + dy*dy);

        currentZoom = currentZoom + ((distance - startDistance) / ZOOM_SENSITIVITY);
        currentZoom = Math.min(Math.max(currentZoom, 0.25), 1);

        scaleEl.style.transform = 'scale(' + currentZoom + ')';
      } else if (!isZoom) {
        var x = this.state.camera.x;
        var y = this.state.camera.y;

        deltaX = (event.touches[0].clientX - startX) / this.state.zoom;
        deltaY = (event.touches[0].clientY - startY) / this.state.zoom;

        var translation = 'translate(' + (x + deltaX) + 'px, ' + (y + deltaY) + 'px)';
        boundingEl.style.transform = translation;
      }

    });

    el.addEventListener('touchend', (event) => {
      boundingEl.style.transition = '';
      scaleEl.style.transition = '';
      if (!didMove) return;
      if (isZoom) {
        this.setState({
          zoom: currentZoom
        });
      } else {
        this.setState({
          camera: {
            x: this.state.camera.x + deltaX,
            y: this.state.camera.y + deltaY
          }
        });
      }
    });
  },
  selectPage: function (el) {
    return () => {
      var state = {
        camera: this.cartesian.getFocusTransform(el.coords),
        selectedEl: el.id,
      };
      this.setState(state);
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
          camera: this.cartesian.getFocusTransform(coords),
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
        zoom: this.state.zoom >= 1 ? 0.5 : this.state.zoom,
        selectedEl: ''
      });
    });

  },
  render: function () {
    var containerStyle = {
      width: this.cartesian.width + 'px',
      height: this.cartesian.height + 'px'
    };

    var boundingStyle = assign(
      {transform: `translate(${this.state.camera.x}px, ${this.state.camera.y}px)`},
      this.cartesian.getBoundingSize()
    );

    return (
      <div id="map">

        <div style={{opacity: this.state.elements.length ? 0 : 1}}>
          Loading...
        </div>

        <div ref="scaler" className="scaler" style={{opacity: this.state.elements.length ? 1 : 0 , transform: `scale(${this.state.zoom})`}}>
          <div ref="bounding" className="bounding" style={boundingStyle}>
            <div className="test-container" style={containerStyle}>
            {this.state.elements.map((el) => {
              return (<div className={classNames({'page-container': true, selected: el.id === this.state.selectedEl})}
                  style={{backgroundColor: el.style.backgroundColor, transform: this.cartesian.getTransform(el.coords)}}
                  onClick={this.selectPage(el)}>
              </div>);
            })}
            {this.cartesian.edges.map(coords => {
              return (<div className="page-container add" style={{transform: this.cartesian.getTransform(coords)}} onClick={this.addPage(coords)}>
                <img className="icon" src="../../img/plus.svg" />
              </div>);
            })}
            </div>
          </div>
        </div>
        <Menu>
          <SecondaryButton side="right" off={!this.state.selectedEl} onClick={this.removePage} icon="../../img/trash.svg" />
          <PrimaryButton url="/projects/123" off={!this.state.selectedEl} href="/pages/project" icon="../../img/pencil.svg" />
        </Menu>
      </div>
    );
  }
});

render(Map);

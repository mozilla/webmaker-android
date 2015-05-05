var React = require('react/addons');
var update = React.addons.update;
var assign = require('react/lib/Object.assign');
var classNames = require('classnames');

var uuid = require('../../lib/uuid');
var render = require('../../lib/render.jsx');
var Binding = require('../../lib/binding.jsx');
var Cartesian = require('../../lib/cartesian');

var Link = require('../../components/link/link.jsx');
var {Menu, PrimaryButton, SecondaryButton} = require('../../components/action-menu/action-menu.jsx');

var elements = require('./fakeElements');

var Map = React.createClass({
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
  mixins: [Binding],
  componentWillMount: function () {

    var width = 300;
    var height = 380;
    var gutter = 20;

    this.cartesian = new Cartesian({
      allCoords: elements.map(el => el.coords),
      width,
      height,
      gutter
    });

    this.setState({
      elements: elements,
      camera: this.cartesian.getFocusTransform({x: 0, y: 0}),
    });

  },
  componentDidMount: function () {
    var el = this.getDOMNode();
    var bounding = this.refs.bounding;
    var boundingEl = bounding.getDOMNode();
    var startX, startY, deltaX, deltaY;
    var didMove = false;

    el.addEventListener('touchstart', (event) => {
      didMove = false;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      boundingEl.style.transition = 'none';
    });

    el.addEventListener('touchmove', (event) => {
      didMove = true;

      var x = parseInt(this.state.camera.x);
      var y = parseInt(this.state.camera.y);

      deltaX = (event.touches[0].clientX - startX) / this.state.zoom;
      deltaY = (event.touches[0].clientY - startY) / this.state.zoom;

      var translation = 'translate(' + (x + deltaX) + 'px, ' + (y + deltaY) + 'px)';
      boundingEl.style.transform = translation;

    });

    el.addEventListener('touchend', (event) => {
      boundingEl.style.transition = '';
      if (didMove) {
        this.state.camera.x += deltaX;
        this.state.camera.y += deltaY;
      }
    });
  },
  selectPage: function (el) {
    return () => {
      var state = {
        camera: this.cartesian.getFocusTransform(el.coords),
        selectedEl: el.id,
      };
      if (this.state.selectedEl === el.id) {
        state.zoom = 1;
      }
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
      var id = uuid();
      this.cartesian.allCoords.push(coords);
      this.setState({
        elements: update(this.state.elements, {$push: [{id, coords: coords, text: 'wahoo...'}]}),
        camera: this.cartesian.getFocusTransform(coords),
        selectedEl: id
      })
    };
  },
  removePage: function () {
    var index;
    this.state.elements.forEach((el, i) => {
      if (el.id === this.state.selectedEl) index = i;
    });
    if (typeof index === 'undefined') return;

    this.cartesian.allCoords.splice(index, 1);
    this.setState({
      elements: update(this.state.elements, {$splice: [[index, 1]]}),
      zoom: this.state.zoom === 1 ? 0.5 : this.state.zoom,
      selectedEl: ''
    });
  },
  render: function () {

    if (!this.state.elements.length) return <div>Oops</div>;

    var containerStyle = {
      width: this.cartesian.width + 'px',
      height: this.cartesian.height + 'px'
    };

    var boundingStyle = assign(
      {transform: `translate(${this.state.camera.x}px, ${this.state.camera.y}px)`},
      this.cartesian.getBoundingSize()
    );

    var addContainerStyle = classNames('page-container add', {off: this.state.zoom == 1});

    return (
      <div id="map">
        <div className="scaler" style={{transform: `scale(${this.state.zoom})`}}>
          <div ref="bounding" className="bounding" style={boundingStyle}>
            <div className="test-container" style={containerStyle}>
            {this.state.elements.map((el) => {
              return (<div className={classNames({'page-container': true, selected: el.id === this.state.selectedEl, unselected: el.id !== this.state.selectedEl && this.state.zoom === 1})}
                  style={{transform: this.cartesian.getTransform(el.coords)}}
                  onClick={this.selectPage(el)}>
                <p>{el.text}</p>
              </div>);
            })}
            {this.cartesian.edges.map(coords => {
              return (<div className={addContainerStyle} style={{transform: this.cartesian.getTransform(coords)}} onClick={this.addPage(coords)}>
                <img className="icon" src="../../img/plus.svg" />
              </div>);
            })}
            </div>
          </div>
        </div>
        <Menu>
          <SecondaryButton side="left" off={this.state.zoom <= 0.25} onClick={this.zoomOut} icon="../../img/zoom-out.svg" />
          <SecondaryButton side="right" off={!this.state.selectedEl} onClick={this.removePage} icon="../../img/trash.svg" />
          <PrimaryButton onClick={this.zoomIn} off={this.state.zoom >= 1} icon="../../img/zoom-in.svg" />
          <PrimaryButton url="/projects/123" href="/pages/project" off={this.state.zoom < 1} icon="../../img/pencil.svg" />
        </Menu>
      </div>
    );
  }
});

render(Map);

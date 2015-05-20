var React = require('react/addons');
var update = React.addons.update;
var assign = require('react/lib/Object.assign');
var classNames = require('classnames');

var render = require('../../lib/render.jsx');
var router = require('../../lib/router.jsx');
var Cartesian = require('../../lib/cartesian');
var Link = require('../../components/link/link.jsx');
var Loading = require('../../components/loading/loading.jsx');
var {Menu, PrimaryButton, SecondaryButton} = require('../../components/action-menu/action-menu.jsx');
var types = require('../../components/el/el.jsx').types;
var ElementGroup = require('../../components/element-group/element-group.jsx');

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
      backgroundColor: this.props.page.styles.backgroundColor,
      transform: this.props.transform
    };
    return (<div className={classes} style={style} onClick={this.props.onClick}>
      <ElementGroup elements={this.props.page.elements} />
    </div>);
  }
});

var Project = React.createClass({
  mixins: [router],
  getInitialState: function () {
    return {
      loading: true,
      selectedEl: '',
      pages: [],
      camera: {
        x: 0,
        y: 0
      },
      zoom: DEFAULT_ZOOM
    };
  },

  uri: function () {
    return `/users/1/projects/${this.state.params.project}/pages`;
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
    }
    if (window.Android) window.Android.setState(JSON.stringify(this.state));
  },

  componentDidMount: function () {
    var el = this.getDOMNode();
    var bounding = this.refs.bounding;
    var boundingEl = bounding.getDOMNode();
    var startX, startY, startDistance, currentX, currentY, currentZoom;
    var didMove = false;

    if (window.Android) {
      var state = JSON.parse(window.Android.getState());
      if (state.params && state.params.page === this.state.params.page) {
        this.setState({
          selectedEl: state.selectedEl,
          camera: state.camera,
          zoom: state.zoom
        });
      }
    }

    el.addEventListener('touchstart', (event) => {
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

  loadPages: function (pages) {
    var state = {loading: false};
    var pages = pages.map(page => {
      page.coords = {
        x: page.x,
        y: page.y
      }
      page.elements = page.elements.map(element => {
        if (!types[element.type]) return false;
        return types[element.type].spec.flatten(element);
      }).filter(element => element);
      delete page.x;
      delete page.y;
      return page;
    });
    this.cartesian.allCoords = pages.map(el => el.coords);
    state.pages = pages;
    if (!this.state.selectedEl) {
      state.camera = this.cartesian.getFocusTransform({x: 0, y: 0}, this.state.zoom);
    }
    this.setState(state);
  },

  load: function () {
    var params = this.state.params;
    this.setState({loading: true});
    api({uri: this.uri()}, (err, data) => {
      if (err) {
        console.error('Error loading project', err);
        this.setState({loading: false});
      } else if (!data || !data.pages || !data.pages.length) {
        // Create the first page
        api({
          method: 'POST',
          uri: this.uri(),
          json: {
            x: 0,
            y: 0
          }
        }, (err, data) => {
          console.log(err, data);
          if (err) {
            console.error('Error creating first page', err);
            this.setState({loading: false});
          } else if (!data || !data.page) {
            console.log('No page id was returned');
            this.setState({loading: false});
          } else {
            this.loadPages([{
              id: data.page.id,
              x: 0,
              y: 0,
              styles: {},
              elements: []
            }]);
          }
        });
      } else {
        this.loadPages(data.pages);
      }
    });
  },

  addPage: function (coords) {
    return () => {
      var params = this.state.params;
      var json = {
        x: coords.x,
        y: coords.y,
        styles: {backgroundColor: '#F0CF62'}
      };
      this.setState({loading: true});
      api({
        method: 'post',
        uri: this.uri(),
        json
      }, (err, data) => {
        this.setState({loading: false});
        if (err) return console.log('Error loading project', err);
        if (!data || !data.page) return console.log('No page id returned');

        json.id = data.page.id;
        json.coords = {x: json.x, y: json.y};
        delete json.x;
        delete json.y;
        this.cartesian.allCoords.push(coords);
        this.setState({
          pages: update(this.state.pages, {$push: [json]}),
          camera: this.cartesian.getFocusTransform(coords, this.state.zoom),
          selectedEl: json.id
        });
      });
    };
  },

  removePage: function () {
    var currentId = this.state.selectedEl;
    var index;
    this.setState({loading: true});
    this.state.pages.forEach((el, i) => {
      if (el.id === currentId) index = i;
    });
    if (typeof index === 'undefined') return;

    // Don't delete test elements for real;
    if (parseInt(currentId, 10) === 1) return alert('this is a test page, not deleting.');

    api({
      method: 'delete',
      uri: `${this.uri()}/${currentId}`
    }, (err) => {
      this.setState({loading: false});
      if (err) return console.error('There was an error deleting the page', err);
      this.cartesian.allCoords.splice(index, 1);
      this.setState({
        pages: update(this.state.pages, {$splice: [[index, 1]]}),
        zoom: this.state.zoom >= MAX_ZOOM ? DEFAULT_ZOOM : this.state.zoom,
        selectedEl: ''
      });
    });

  },

  render: function () {
    // Prevent pull to refresh
    document.body.style.overflowY = 'hidden';

    var containerStyle = {
      width: this.cartesian.width + 'px',
      height: this.cartesian.height + 'px'
    };

    var boundingStyle = assign({
        transform: `translate(${this.state.camera.x}px, ${this.state.camera.y}px) scale(${this.state.zoom})`,
        opacity: this.state.pages.length ? 1 : 0
      },
      this.cartesian.getBoundingSize()
    );

    var pageUrl = `/projects/${this.state.params.project}/pages/${this.state.selectedEl}`;

    return (
      <div id="map">

        <div ref="bounding" className="bounding" style={boundingStyle}>
          <div className="test-container" style={containerStyle}>
          {this.state.pages.map((page) => {
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

        <Loading on={this.state.loading} />
      </div>
    );
  }
});

render(Project);

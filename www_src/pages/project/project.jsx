var React = require('react/addons');
var update = React.addons.update;
var assign = require('react/lib/Object.assign');
var classNames = require('classnames');

var render = require('../../lib/render.jsx');
var router = require('../../lib/router.jsx');
var Cartesian = require('../../lib/cartesian');
var Loading = require('../../components/loading/loading.jsx');
var {Menu, PrimaryButton, SecondaryButton} = require('../../components/action-menu/action-menu.jsx');
var types = require('../../components/el/el.jsx').types;
var ElementGroup = require('../../components/element-group/element-group.jsx');

var api = require('../../lib/api');
var calculateSwipe = require('../../lib/swipe.js');

// I'm sorrry
var $ = require('jquery');
require('../../lib/panzoom-jquery.js');

var MAX_ZOOM = 0.8;
var MIN_ZOOM = 0.18;
var DEFAULT_ZOOM = 0.5;


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
      matrix: [ DEFAULT_ZOOM, 0, 0, DEFAULT_ZOOM, 0, 0 ],
      isPageZoomed: false
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

    if (window.Android) {
      window.Android.setState(JSON.stringify(this.state));
    }
  },

  componentDidMount: function () {
    var bounding = this.refs.bounding;
    var boundingEl = bounding.getDOMNode();

    if (window.Android) {
      var state = JSON.parse(window.Android.getState());
      if (state.params && state.params.page === this.state.params.page) {
        var newState = {};
        ['selectedEl', 'matrix'].forEach(prop => {
          if (state[prop]) {
            newState[prop] = state[prop];
          }
        });
        this.setState(newState);
      }
    }

    this.$boundingEl = $(boundingEl);

    this.$boundingEl.panzoom({
      minScale: MIN_ZOOM,
      maxScale: MAX_ZOOM
    });

  },

  getZoom: function () {
    return this.state.matrix[0];
  },

  panMatrix: function (x, y, matrix) {
    matrix = matrix || this.$boundingEl.panzoom('getMatrix');

    matrix[4] = x;
    matrix[5] = y;

    return matrix;
  },

  panZoomMatrix: function (x, y, zoom) {
    var matrix = this.panMatrix(x, y);
    matrix[0] = zoom;
    matrix[3] = zoom;

    return matrix;
  },

  getFocusTransform: function (x, y, zoom) {
    zoom = zoom || this.getZoom();
    var coords = this.cartesian.getFocusTransform({x, y}, zoom);
    return this.panZoomMatrix(coords.x, coords.y, zoom);
  },

  selectPage: function (el) {
    this.$boundingEl.panzoom('transition');
    this.setState({
      matrix: this.getFocusTransform(el.coords.x, el.coords.y),
      selectedEl: el.id
    });
  },

  zoomToPage: function (coords) {
    this.$boundingEl.panzoom('transition');
    this.$boundingEl.panzoom('enable');

    this.setState({
      matrix: this.getFocusTransform(coords.x, coords.y, 1),
      isPageZoomed: true,
      zoomedPageCoords: coords
    });

    this.$boundingEl.panzoom('disable');
  },

  zoomFromPage: function () {
    this.$boundingEl.panzoom('transition');
    this.$boundingEl.panzoom('enable');
    var coords = this.state.zoomedPageCoords;
    this.setState({
      matrix: this.getFocusTransform(coords.x, coords.y, DEFAULT_ZOOM),
      isPageZoomed: false
    });
  },

  /**
   * Zoom into a specified page while retaining the current mode (edit/play)
   *
   * @param  {object} coords Co-ordinates (x,y) for page
   *
   * @return {void}
   */
  zoomToSelection: function (coords) {
    this.$boundingEl.panzoom('transition');
    this.setState({
      matrix: this.getFocusTransform(coords.x, coords.y, 1),
      zoomedPageCoords: coords
    });
  },

  touchState: {
    didMove: false,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
  },

  onTouchStart: function (event) {
    this.touchState.didMove = false;
    if (event.touches.length !== 1) {
      return;
    }
    this.touchState.startX = event.touches[0].clientX;
    this.touchState.startY = event.touches[0].clientY;
  },

  onTouchMove: function (event) {
    this.touchState.didMove = true;
    this.touchState.endX = event.touches[0].clientX;
    this.touchState.endY = event.touches[0].clientY;
  },

  onTouchEnd: function (event) {

    if (this.touchState.didMove) {
      this.setState({
        matrix: this.$boundingEl.panzoom('getMatrix')
      });
    }

    // Only needs to be run for swipes when
    // zoomed in, in play mode
    if (event.touches.length !== 0 || !this.state.isPageZoomed) {
      return;
    }

    var startX = this.touchState.startX;
    var startY = this.touchState.startY;
    var {startX, startY, endX, endY} = this.touchState;

    var swipeDirection = calculateSwipe(startX, startY, endX, endY);
    var pageX = this.state.zoomedPageCoords.x;
    var pageY = this.state.zoomedPageCoords.y;

    if (!swipeDirection) {
      return;
    }

    var panTargets = {
      LEFT: {x: pageX + 1, y: pageY},
      RIGHT: {x: pageX - 1, y: pageY},
      UP: {x: pageX, y: pageY + 1},
      DOWN: {x: pageX, y: pageY - 1}
    };

    // Determine if an adjacent page exists
    var isAdjacentPage = false;
    var target = panTargets[swipeDirection];

    this.state.pages.forEach(function (page) {
      if (page.coords.x === target.x && page.coords.y === target.y) {
        isAdjacentPage = true;
      }
    });

    if (isAdjacentPage) {
      this.zoomToPage(target);
    }

  },

  loadPages: function (pages) {
    var state = {loading: false};
    var pages = pages.map(page => {
      page.coords = {
        x: page.x,
        y: page.y
      };

      page.elements = page.elements.map(element => {
        if (!types[element.type]) {
          return false;
        }
        return types[element.type].spec.flatten(element);
      }).filter(element => element);

      delete page.x;
      delete page.y;

      return page;
    });
    this.cartesian.allCoords = pages.map(el => el.coords);
    state.pages = pages;
    if (!this.state.selectedEl) {
      state.matrix = this.getFocusTransform(0, 0);
    }
    this.setState(state);
  },

  load: function () {
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
              selectedEl: data.page.id,
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
      var json = {
        x: coords.x,
        y: coords.y,
        styles: {backgroundColor: '#fafcff'}
      };
      this.setState({loading: true});
      api({
        method: 'post',
        uri: this.uri(),
        json
      }, (err, data) => {
        this.setState({loading: false});
        if (err) {
          return console.log('Error loading project', err);
        }

        if (!data || !data.page) {
          return console.log('No page id returned');
        }

        json.id = data.page.id;
        json.coords = {x: json.x, y: json.y};
        delete json.x;
        delete json.y;

        var matrix = this.getFocusTransform(coords.x, coords.y);

        this.cartesian.allCoords.push(coords);
        this.$boundingEl.panzoom('transition');
        this.setState({
          pages: update(this.state.pages, {$push: [json]}),
          matrix,
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
      if (el.id === currentId) {
        index = i;
      }
    });
    if (typeof index === 'undefined') {
      return;
    }

    // Don't delete test elements for real;
    if (parseInt(currentId, 10) === 1) {
      return window.alert('this is a test page, not deleting.');
    }

    api({
      method: 'delete',
      uri: `${this.uri()}/${currentId}`
    }, (err) => {
      this.setState({loading: false});
      if (err) {
        return console.error('There was an error deleting the page', err);
      }

      this.cartesian.allCoords.splice(index, 1);
      this.$boundingEl.panzoom('transition');
      this.setState({
        pages: update(this.state.pages, {$splice: [[index, 1]]}),
        selectedEl: ''
      });
    });

  },

  onPageClick: function (page) {

    if (this.state.params.mode === 'play') {
      this.zoomToPage(page.coords);
    } else if (page.id === this.state.selectedEl) {
      this.zoomToSelection(page.coords);
    } else {
      this.selectPage(page);
    }
  },

  render: function () {
    // Prevent pull to refresh
    document.body.style.overflowY = 'hidden';

    var self = this;
    var isPlayOnly = this.state.params.mode === 'play';

    if (this.state.isPageZoomed) {
      this.$boundingEl.panzoom('disable');
    }

    var boundingProps = {
      style: assign(this.cartesian.getBoundingSize(), {
        transform: this.state.matrix ? `matrix(${this.state.matrix.join(', ')})` : false
      }),
      onTouchStart: this.onTouchStart,
      onTouchMove: this.onTouchMove,
      onTouchEnd: this.onTouchEnd
    };

    var innerStyle = {
      width: this.cartesian.width + 'px',
      height: this.cartesian.height + 'px'
    };

    var pageUrl = `/projects/${this.state.params.project}/pages/${this.state.selectedEl}`;

    function generateAddContainers() {
      if (!isPlayOnly) {
        return self.cartesian.edges.map(coords => {
          return (<div className="page-container add" style={{transform: self.cartesian.getTransform(coords)}} onClick={self.addPage(coords)}>
            <img className="icon" src="../../img/plus.svg" />
          </div>);
        });
      }
    }

    return (
      <div id="map">

        <div ref="bounding" className="bounding" {...boundingProps}>
          <div className="bounding-inner" style={innerStyle}>
          {this.state.pages.map((page) => {
            var props = {
              page,
              selected: page.id === this.state.selectedEl,
              transform: this.cartesian.getTransform(page.coords),
              onClick: this.onPageClick.bind(this, page)
            };
            return (<Page {...props} />);
          })}
          { generateAddContainers() }
          </div>
        </div>

        <Menu>
          <SecondaryButton side="right" off={isPlayOnly || !this.state.selectedEl} onClick={this.removePage} icon="../../img/trash.svg" />
          <PrimaryButton url={pageUrl} off={isPlayOnly || !this.state.selectedEl} href="/pages/page" icon="../../img/pencil.svg" />
          <PrimaryButton onClick={this.zoomFromPage} off={!this.state.isPageZoomed} icon="../../img/zoom-out.svg" />
        </Menu>

        <Loading on={this.state.loading} />
      </div>
    );
  }
});

render(Project);

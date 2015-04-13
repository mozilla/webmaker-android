var React = require('react');
var render = require('../../lib/render.jsx');
var Draggable = require('react-draggable');

function generateGrid(width, height) {
  var grid = [];

  for (var h = 0; h < height; h++) {
    grid.push([]);

    for (var w = 0; w < width; w++) {
      grid[h].push(null);
    }
  }

  grid[Math.floor(height / 2)][Math.floor(width / 2)] = 'EMPTY';

  return grid;
}

var Page = React.createClass({
  handleClick: function (event) {
    this.props.onClick(event);
  },
  render: function () {
    var style = {};

    if (this.props.screenshot !== 'EMPTY') {
      style.backgroundImage = 'url(' + this.props.screenshot + ')';
    }

    return (
      <div
        onClick={this.handleClick}
        className="page"
        style={style}>
      </div>
    );
  }
});

var AddPage = React.createClass({
  render: function () {
    return (
      <button
        onClick={this.handleClick}
        className="add-page">
      </button>
    )
  },
  handleClick: function (event) {
    this.props.onClick(event);
  }
})

var Slot = React.createClass({
  render: function () {
    return (
      <div
        className="slot"
        style={this.props.style}>
          {this.props.children}
      </div>
    );
  }
});

var Grid = React.createClass({
  zoomToPage: function (event) {
    var midpointX = Math.floor(this.tilesPerRow / 2);
    var midpointY = Math.floor(this.tilesPerCol / 2);

    var cameraX = 0;
    var cameraY = 0;

    var isEvenWidth = this.tilesPerRow % 2 === 0;
    var isEvenHeight = this.tilesPerCol % 2 === 0;

    if (event.x > midpointX) {
      cameraX = (event.x - midpointX) * -1 * this.slotWidth;

      if (isEvenWidth) {
        cameraX += (this.slotWidth / 2);
      }
    } else if (event.x <= midpointX) {
      cameraX = (midpointX - event.x) * this.slotWidth;

      if (isEvenWidth) {
        cameraX -= (this.slotWidth / 2);
      }
    }

    if (event.y > midpointY) {
      cameraY = (event.y - midpointY) * -1 * this.slotHeight;

      if (isEvenHeight) {
        cameraY += (this.slotHeight / 2);
      }
    } else if (event.y <= midpointY) {
      cameraY = (midpointY - event.y) * this.slotHeight;

      if (isEvenHeight) {
        cameraY -= (this.slotHeight / 2);
      }
    }

    this.setState({
      zoom: this.state.containerWidth / this.slotWidth,
      cameraX: cameraX,
      cameraY: cameraY
    });
  },
  getInitialState: function () {
    var layout = generateGrid(3, 3);

    return {
      layout: layout
    }
  },
  addPageClick: function (event) {
    var newLayout = this.state.layout;

    newLayout[event.y][event.x] = 'EMPTY';

    var width = newLayout[0].length;
    var height = newLayout.length;

    // Detect what grid boundaries the given tile touches
    function edgeDetect(x, y) {
      var boundaries = [];

      if (x === 0) {
        boundaries.push('left');
      }

      if (x === newLayout[0].length - 1) {
        boundaries.push('right');
      }

      if (y === 0) {
        boundaries.push('top');
      }

      if (y === newLayout.length - 1) {
        boundaries.push('bottom');
      }

      return boundaries;
    }

    // Expand the grid in the specified direction
    function expandGrid(direction) {
      function buildEmptyRow(length) {
        var row = [];

        for (var i = 0; i < length; i++) {
          row.push(null);
        }

        return row;
      }

      var expand = {
        left: function () {
          newLayout.forEach(function (row, index) {
            row.unshift(null);
          });
        },
        right: function () {
          newLayout.forEach(function (row, index) {
            row.push(null);
          });
        },
        top: function () {
          newLayout.unshift(buildEmptyRow(newLayout[0].length));
        },
        bottom: function () {
          newLayout.push(buildEmptyRow(newLayout[0].length));
        }
      }

      expand[direction]();
    }

    // Expand grid if necessary
    if (edgeDetect(event.x, event.y).length) {
      edgeDetect(event.x, event.y).forEach(function (direction, index, array) {
        expandGrid(direction);
      });
    }

    this.setState({
      layout: newLayout
    });
  },
  componentDidUpdate: function () {
    var elGrid = this.getDOMNode();

    // Force fixed width & height on grid
    elGrid.style.width = this.gridWidth + 'px';
    elGrid.style.height = this.gridHeight + 'px';
  },
  setContainerDimensions: function (width, height) {
    this.setState({
      containerWidth: width,
      containerHeight: height
    });
  },
  render: function () {
    var self = this;

    this.gridWidth = undefined;
    this.gridHeight = undefined;

    this.slotWidth = undefined;
    this.slotHeight = undefined;

    var nodes = [];
    var layout = this.state.layout;

    this.tilesPerRow = layout[0].length;
    this.tilesPerCol = layout.length;

    // Parse aspect ratio
    var widthAR = parseInt(this.props.aspectRatio.split(':')[0], 10);
    var heightAR = parseInt(this.props.aspectRatio.split(':')[1], 10);

    // Determine if a slot has a neighboring page in any cardinal direction
    function hasNeighbors(x, y) {
      if (x > 0 && layout[y][x - 1]) {
        return true;
      }

      if (x < layout[0].length - 1 && layout[y][x + 1]) {
        return true;
      }

      if (y > 0 && layout[y - 1][x]) {
        return true;
      }

      if (y < layout.length - 1 && layout[y + 1][x]) {
        return true;
      }

      return false;
    }

    // Try to fit grid in viewport by constraining to the width
    this.slotWidth = (self.state.containerWidth / this.tilesPerRow);
    this.slotHeight = this.slotWidth * (heightAR / widthAR);

    // If the height overflows, then constrain by height instead
    if (this.slotHeight * this.tilesPerCol > self.state.containerHeight) {
      this.slotHeight = self.state.containerHeight / this.tilesPerCol;
      this.slotWidth = this.slotHeight * (widthAR / heightAR);
    }

    var slotStyle = {
      width: this.slotWidth + 'px',
      height: this.slotHeight + 'px'
    }

    this.gridWidth = this.slotWidth * this.tilesPerRow;
    this.gridHeight = this.slotHeight * this.tilesPerCol;

    // Render slots
    for (var y = 0; y < layout.length; y++) {
      for (var x = 0; x < layout[0].length; x++) {
        if (layout[y][x]) {
          nodes.push(
            <Slot x={x} y={y} style={slotStyle} key={ y + '-' + x }>
              <Page onClick={ this.zoomToPage.bind(this, {x:x, y:y}) } screenshot={layout[y][x]} />
            </Slot>
          );
        } else if (hasNeighbors(x, y)) {
          nodes.push(
            <Slot x={x} y={y} style={slotStyle} key={ y + '-' + x }>
              {/* Overriding default click param to provide x/y coords without AddPage knowing them. */}
              <AddPage onClick={ this.addPageClick.bind(this, {x:x, y:y}) }/>
            </Slot>
          );
        } else {
          nodes.push(
            <Slot x={x} y={y} style={slotStyle} key={ y + '-' + x } />
          );
        }
      }
    }

    var transform =
      'scale(' + this.state.zoom + ') translate3d(' + this.state.cameraX + 'px, ' + this.state.cameraY + 'px, 0)';

    var gridTransform = {
      transform: transform,
      WebkitTransform: transform
    }

    return (
      <div className="grid" style={gridTransform}>
        {nodes}
      </div>
    );
  }
});

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  changeZoom: function (event) {
    this.refs.masterGrid.zoom(event.amount);
  },
  showOverview: function () {
    console.log('showo');
    this.refs.masterGrid.setState({
      zoom: 1,
      cameraX: 0,
      cameraY: 0
    });
  },
  componentDidMount: function () {
    // Pass container dimensions in once initial render is complete
    //   since container must be measured before tiles can be properly laid out...
    var elWrapper = this.refs.wrapper.getDOMNode();
    this.refs.masterGrid.setContainerDimensions(elWrapper.clientWidth, elWrapper.clientHeight);
  },
  render: function () {

    // TEMP: Change div w. zIndex to Draggable to enable drag

    return (
      <div className="section-2">
        <div className="segmented-control">
          <button onClick={ this.showOverview }>Show Overview</button>
        </div>
        <div ref="wrapper" className="wrapper">
          <div zIndex={100}>
            <div>
              <Grid ref="masterGrid" aspectRatio={"35:40"}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

render(App);

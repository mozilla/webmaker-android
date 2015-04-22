var React = require('react');
var Hammer = require('react-hammerjs');

var Slot = require('./slot.jsx');
var Page = require('./page.jsx');

module.exports = React.createClass({
  /**
   * Zoom in to a page tile
   * @param  {Number} pageX Page's x coordinate in grid
   * @param  {Number} pageY Page's y coordinate in grid
   * @param  {Number} pagesWide Number of pages to fit in width-wise
   * @param  {boolean} doCentering Determine whether or not to move "camera" to center the target
   */
  calculateCameraState: function (pageX, pageY, pagesWide, doCentering) {
    var cameraX = 0;
    var cameraY = 0;

    var isEvenWidth = this.tilesPerRow % 2 === 0;
    var isEvenHeight = this.tilesPerCol % 2 === 0;

    var midpointX = Math.floor(this.tilesPerRow / 2);
    var midpointY = Math.floor(this.tilesPerCol / 2);

    // Tweak midpoints if needed...

    if (isEvenHeight) {
      if (pageY >= midpointY) {
        midpointY--;
      }
    }

    if (isEvenWidth) {
      if (pageX >= midpointX) {
        midpointX--;
      }
    }

    // Calculate new camera position

    if (pageX > midpointX) {
      cameraX = (pageX - midpointX) * -1 * this.slotWidth;

      if (isEvenWidth) {
        cameraX += (this.slotWidth / 2);
      }
    } else if (pageX <= midpointX) {
      cameraX = (midpointX - pageX) * this.slotWidth;

      if (isEvenWidth) {
        cameraX -= (this.slotWidth / 2);
      }
    }

    if (pageY > midpointY) {
      cameraY = (pageY - midpointY) * -1 * this.slotHeight;

      if (isEvenHeight) {
        cameraY += (this.slotHeight / 2);
      }
    } else if (pageY <= midpointY) {
      cameraY = (midpointY - pageY) * this.slotHeight;

      if (isEvenHeight) {
        cameraY -= (this.slotHeight / 2);
      }
    }

    var newDisplayState = {
      zoom: this.state.containerWidth / (this.slotWidth * pagesWide),
      previousZoom: this.displayState.zoom || this.state.containerWidth / (this.slotWidth * pagesWide),
      pagesWide: pagesWide,
      focusedPageCoords: {x: pageX, y: pageY}
    }

    if (doCentering) {
      newDisplayState.previousCameraX = this.displayState.cameraX;
      newDisplayState.previousCameraY = this.displayState.cameraY;
      newDisplayState.cameraX = cameraX;
      newDisplayState.cameraY = cameraY;
    }

    this.displayState = newDisplayState;
  },
  onPageTap: function (event) {
    // TODO : TEMP - Just rotating through zoom factors

    var zoomFactor = 3.25;

    if (this.displayState.pagesWide) {
      zoomFactor = this.displayState.pagesWide === 1 ? 3.25 : 1;
    }

    this.activeTile = {
      x: event.x,
      y: event.y
    };

    this.calculateCameraState(event.x, event.y, zoomFactor, true);
    this.animateCamera(true);
  },
  setZoomLevel: function (level) {
    if (this.activeTile) {
      this.calculateCameraState(this.activeTile.x, this.activeTile.y, level, true);
    } else {
      this.calculateCameraState(Math.floor(this.tilesPerRow / 2 ), Math.floor(this.tilesPerCol / 2), level, true);
    }

    this.animateCamera(true);
  },
  generateGrid: function (width, height) {
    var grid = [];

    for (var h = 0; h < height; h++) {
      grid.push([]);

      for (var w = 0; w < width; w++) {
        grid[h].push(null);
      }
    }

    grid[Math.floor(height / 2)][Math.floor(width / 2)] = {};

    return grid;
  },
  getInitialState: function () {
    // 20 x 20 seems to be max before display glitches
    var layout = this.generateGrid(3, 3);

    return {
      layout: layout
    }
  },
  addPageTap: function (event) {
    var newLayout = this.state.layout;

    newLayout[event.y][event.x] = {};

    var width = newLayout[0].length;
    var height = newLayout.length;

    // The new page tile's x and y coords may shift if the grid is expanded
    var newPageX = event.x;
    var newPageY = event.y;

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

          newPageX++;
        },
        right: function () {
          newLayout.forEach(function (row, index) {
            row.push(null);
          });
        },
        top: function () {
          newLayout.unshift(buildEmptyRow(newLayout[0].length));
          newPageY++;
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
    }, function () {
      this.calculateCameraState(newPageX, newPageY, this.displayState.pagesWide, true);
      this.animateCamera(false);
    });
  },
  componentDidUpdate: function () {
    var elGrid = this.getDOMNode();

    // Force fixed width & height on grid
    elGrid.style.width = this.gridWidth + 'px';
    elGrid.style.height = this.gridHeight + 'px';
  },
  componentDidMount: function () {
    this.gridWidth = undefined;
    this.gridHeight = undefined;

    this.slotWidth = undefined;
    this.slotHeight = undefined;

    this.tilesPerRow = undefined;
    this.tilesPerCol = undefined;

    this.displayState = {};
  },
  // Determine if a slot has a neighboring page in any cardinal direction
  hasNeighbors: function (x, y) {
    var layout = this.state.layout;

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
  },
  setContainerDimensions: function (width, height) {
    this.setState({
      containerWidth: width,
      containerHeight: height
    });
  },
  animateCamera: function (animateZoom) {
    if (typeof animateZoom !== 'boolean') {
      animateZoom = false;
    }

    var elGrid = this.getDOMNode();

    var scaleTransform = 'scale(' + (this.displayState.zoom || 1) + ')';
    var previousScaleTransform = 'scale(' + (this.displayState.previousZoom || 1) + ')';

    var translateTransform = ' translate3d(' + this.displayState.cameraX + 'px, ' + this.displayState.cameraY + 'px, 0)';
    var previousTranslateTransform = ' translate3d(' + this.displayState.previousCameraX + 'px, ' + this.displayState.previousCameraY + 'px, 0)';

    var finalTransform = scaleTransform;

    if (typeof this.displayState.cameraX === 'number' && typeof this.displayState.cameraY === 'number') {
      finalTransform += (' '  + translateTransform)
    }

    if (animateZoom) {
      elGrid.classList.add('animated');

      elGrid.style.transform = previousScaleTransform + ' ' + translateTransform;

      // TODO - use transition end event instead of timeout
      setTimeout(function() {
        elGrid.style.transform = finalTransform;

        setTimeout(function() {
          elGrid.classList.remove('animated');
          this.onZoomChange();
        }.bind(this), 300);
      }.bind(this), 300);
    } else {
      elGrid.classList.remove('animated');
      elGrid.style.transform = scaleTransform + ' ' + previousTranslateTransform;

      // Allow previous transform to complete (prevent zoom throb motion at edges)
      setTimeout(function() {
        elGrid.classList.add('animated');
        elGrid.style.transform = scaleTransform + ' ' + translateTransform;

        setTimeout(function() {
          elGrid.classList.remove('animated');
        }, 300);
      }, 1);
    }
  },
  onZoomChange: function () {
    if (this.props.onZoomChange) {
      this.props.onZoomChange.call(this, this.displayState);
    }
  },
  render: function () {
    var nodes = [];
    var layout = this.state.layout;

    this.tilesPerRow = layout[0].length;
    this.tilesPerCol = layout.length;

    // Parse aspect ratio
    var widthAR = parseInt(this.props.aspectRatio.split(':')[0], 10);
    var heightAR = parseInt(this.props.aspectRatio.split(':')[1], 10);

    // Try to fit grid in viewport by constraining to the width
    this.slotWidth = this.state.containerWidth / this.tilesPerRow;
    this.slotHeight = this.slotWidth * (heightAR / widthAR);

    // If the height overflows, then constrain by height instead
    if (this.slotHeight * this.tilesPerCol > this.state.containerHeight) {
      this.slotHeight = this.state.containerHeight / this.tilesPerCol;
      this.slotWidth = this.slotHeight * (widthAR / heightAR);
    }

    this.slotWidth = Math.floor(this.slotWidth);
    this.slotHeight = Math.floor(this.slotHeight);

    var slotStyle = {
      width: this.slotWidth + 'px',
      height: this.slotHeight + 'px'
    }

    this.gridWidth = this.slotWidth * this.tilesPerRow;
    this.gridHeight = this.slotHeight * this.tilesPerCol;

    // Render slots
    for (var y = 0; y < this.tilesPerCol; y++) {
      for (var x = 0; x < this.tilesPerRow; x++) {
        if (layout[y][x]) {
          nodes.push(
            <Slot x={x} y={y} style={slotStyle} key={ y + '-' + x }>
              <Page onDoubleTap={ this.onPageTap.bind(this, {x:x, y:y}) } />
            </Slot>
          );
        } else if (this.hasNeighbors(x, y)) {
          nodes.push(
            <Slot x={x} y={y} style={slotStyle} key={ y + '-' + x }>
              {/* Overriding default onTap param to provide x/y coords without AddPage knowing them. */}
              <Hammer className="add-page" onTap={ this.addPageTap.bind(this, {x:x, y:y}) }/>
            </Slot>
          );
        } else {
          nodes.push(
            <Slot x={x} y={y} style={slotStyle} key={ y + '-' + x } />
          );
        }
      }
    }

    return (
      <div className="grid">
        {nodes}
      </div>
    );
  }
});

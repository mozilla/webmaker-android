var React = require('react');
var render = require('../../lib/render.jsx');
var Draggable = require('react-draggable');

var Page = React.createClass({
  render: function () {
    var style = {};

    if (this.props.screenshot !== 'EMPTY') {
      style.backgroundImage = 'url(' + this.props.screenshot + ')';
    }

    return (
      <div
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
  zoom: function (amount) {
    this.setState({
      zoom: amount
    });
  },
  getInitialState: function () {
    var layout = [
      [null, null, null],
      [null, 'EMPTY', null],
      [null, null, null]
    ];

    return {
      zoom: this.props.initialZoom,
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
  render: function () {
    var nodes = [];
    var layout = this.state.layout;

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

    // If height > width then
    //  augment grid with empty slots to prevent wrapping issues in display
    if (layout.length > layout[0].length) {
      for (var q = 0, qq = layout.length - layout[0].length; q < qq; q++) {
        console.log('h');
        layout.forEach(function (row, index, array) {
          row.push(null);
        });
      }
    }

    var slotStyle = {
      width: (100 / layout[0].length) + '%',
      height: (100 / layout[0].length) + '%'
    }

    for (var y = 0; y < layout.length; y++) {
      for (var x = 0; x < layout[0].length; x++) {
        if (layout[y][x]) {
          nodes.push(
            <Slot x={x} y={y} style={slotStyle} key={ y + '-' + x }>
              <Page screenshot={layout[y][x]} />
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

    var gridTransform = {
      transform: 'scale(' + this.state.zoom + ')',
      WebkitTransform: 'scale(' + this.state.zoom + ')'
    }

    return (
      <div className="grid" style={gridTransform}>
        {nodes}
      </div>
    );
  }
});

var SegmentedControl = React.createClass({
  getInitialState: function () {
    return {
      amount: 1
    };
  },
  modifyAmount: function (delta) {
    this.state.amount *= delta;

    this.props.onAmountChange({
      amount: this.state.amount
    });
  },
  increase: function () {
    this.modifyAmount(2);
  },
  decrease: function () {
    this.modifyAmount(0.5);
  },
  render: function () {
    return (
      <div className="segmented-control">
        <button onClick={ this.increase }><span>+</span></button>
        <button onClick={ this.decrease }><span>-</span></button>
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
  render: function () {
    return (
      <div className="section-2">
        <SegmentedControl onAmountChange={ this.changeZoom }/>
        <div className="wrapper">
          <Draggable zIndex={100}>
            <div>
              <Grid initialZoom={1} ref="masterGrid"/>
            </div>
          </Draggable>
        </div>
      </div>
    );
  }
});

render(App);

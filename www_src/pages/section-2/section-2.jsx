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
        style={{
          width: 100 / parseInt(this.props.perRow, 10) + '%',
          height: 100 / parseInt(this.props.perRow, 10) + '%'
        }}>
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

    this.setState({
      layout: newLayout
    });
  },
  render: function () {
    var nodes = [];

    var self = this;

    // Determine if a slot has a neighboring page in any cardinal direction
    function hasNeighbors(x, y) {
      if (x > 0 && self.state.layout[y][x - 1]) {
        return true;
      }

      if (x < self.state.layout[0].length - 1 && self.state.layout[y][x + 1]) {
        return true;
      }

      if (y > 0 && self.state.layout[y - 1][x]) {
        return true;
      }

      if (y < self.state.layout.length - 1 && self.state.layout[y + 1][x]) {
        return true;
      }

      return false;
    }

    for (var y = 0; y < this.state.layout.length; y++) {
      for (var x = 0; x < this.state.layout[0].length; x++) {
        if (this.state.layout[y][x]) {
          nodes.push(
            <Slot x={x} y={y} perRow={this.state.layout[0].length} key={ y + '-' + x }>
              <Page screenshot={this.state.layout[y][x]} />
            </Slot>
          );
        } else if (hasNeighbors(x, y)) {
          nodes.push(
            <Slot x={x} y={y} perRow={this.state.layout[0].length} key={ y + '-' + x }>
              {/* Overriding default click param to provide x/y coords without AddPage knowing them. */}
              <AddPage onClick={ this.addPageClick.bind(this, {x:x, y:y}) }/>
            </Slot>
          );
        } else {
          nodes.push(
            <Slot x={x} y={y} perRow={this.state.layout[0].length} key={ y + '-' + x } />
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
      <div>
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

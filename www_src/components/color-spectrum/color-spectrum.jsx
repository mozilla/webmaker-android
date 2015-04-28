var React = require('react');

// Doesn't do much yet, but renders the hue and saturation spectrum

var ColorSpectrum = React.createClass({
  render: function () {
    return (<div className="spectrum-container">
      <div className="spectrum-left">
        <div className="saturation" style={{backgroundColor: this.props.value}}>
          <div className="saturation-white" />
          <div className="saturation-black" />
        </div>
        <input className="hue" type="range" orient="vertical" />
      </div>
      <div className="spectrum-right" />
    </div>);
  }
});

module.exports = ColorSpectrum;

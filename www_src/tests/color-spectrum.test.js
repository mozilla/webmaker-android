var should = require('should');
var React = require('react/addons');
var ColorSpectrum = require('../components/color-spectrum/color-spectrum.jsx');

describe('ColorSpectrum', function() {
  it('does not throw when props.color is an empty string', function() {
    var renderer = React.addons.TestUtils.createRenderer();
    renderer.render(React.createElement(ColorSpectrum, {color: ''}));
  });

  describe("getColor()", function() {
    var getColor = ColorSpectrum.prototype.getColor;

    it('returns color if it is well-formed', function() {
      getColor('rgba(255, 0, 0, 0)', 'rgba(0, 0, 0, 0)').rgbaString()
        .should.eql('rgba(255, 0, 0, 0)');
    });

    it('returns default color if color is malformed', function() {
      getColor('aweg', 'rgba(0, 0, 0, 0)').rgbaString()
        .should.eql('rgba(0, 0, 0, 0)');
    });
  });
});

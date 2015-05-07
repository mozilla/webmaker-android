var Color = require('color');
var minimumContrast = 2;

module.exports = {
  getContrastingColor: (function() {
    var white = Color().rgb(255, 255, 255),
        whiteCSS = white.rgbString(),
        black = Color().rgb(0, 0, 0),
        blackCSS = black.rgbString();
    return function(input) {
      var c = Color(input),
          wc = white.contrast(c),
          bc = black.contrast(c);
      return (wc < bc && wc >= minimumContrast) ? whiteCSS : blackCSS;
    };
  }())
};

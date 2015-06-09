var React = require('react/addons');

/**
 * This is a mixin due to the fact that we rely on this.linkState,
 * which handles the automatic state binding to whatever component
 * is using this font selection component for changing font-family
 */
module.exports = {
  /**
   * Generate the dropdown selector for fonts, with each font option
   * styled in the appropriate font.
   * @return {[type]}
   */
  generateFontSelector: function() {
    var fonts = ["Roboto", "Bitter", "Pacifico"];
    var options = fonts.map(name => {
      // setting style on an <option> does not work in WebView...
      return <option key={name} value={name}>{name}</option>;
    });
    return <select className="select" valueLink={this.linkState('fontFamily')}>{ options }</select>;
  }
};

var React = require('react/addons');
var assign = require('react/lib/Object.assign');
var Spec = require('../../../lib/spec');

var BASE_DEFAULT_URL = 'https://stuff.webmaker.org/webmaker-android/default-images/';
var TOTAL_PNGS = 10;
var TOTAL_SVGS = 5;

var spec = new Spec('image', assign({
  src: {
    category: 'attributes',
    validation: React.PropTypes.string,
    default: function () {
      var max = TOTAL_PNGS + TOTAL_SVGS;
      var randomInt = Math.floor(Math.random() * max);
      var ext;
      if (randomInt >= TOTAL_PNGS) {
        randomInt -= TOTAL_PNGS;
        ext = '.svg';
      } else {
        ext = '.jpg';
      }
      return BASE_DEFAULT_URL + randomInt + ext;
    }
  },
  alt: {
    category: 'attributes',
    validation: React.PropTypes.string,
    default: ''
  },
  opacity: {
    category: 'styles',
    validation: React.PropTypes.number,
    default: 1
  },
  borderWidth: {
    category: 'styles',
    validation: React.PropTypes.number,
    default: 0
  },
  borderColor: {
    category: 'styles',
    validation: React.PropTypes.string,
    editor: 'color',
    default: ''
  },
  borderRadius: {
    category: 'styles',
    validation: React.PropTypes.number,
    default: 0
  }
}, Spec.getPositionProps()));

module.exports = React.createClass({

  statics: {spec},

  propTypes: spec.getPropTypes(),

  getDefaultProps: function () {
    return spec.getDefaultProps();
  },

  render: function() {
    var props = this.props;
    var style = {
      opacity: props.opacity,
      borderStyle: 'solid',
      borderWidth: props.borderWidth,
      borderColor: props.borderColor,
      borderRadius: props.borderRadius
    };
    return <img style={style} src={this.props.src} alt={this.props.alt} />;
  }
});

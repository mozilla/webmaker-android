var React = require('react/addons');
var assign = require('react/lib/Object.assign');
var Spec = require('../lib/spec');

var spec = new Spec(assign({
  src: {
    category: 'attributes',
    validation: React.PropTypes.string,
    default: ''
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
    default: 'transparent'
  }
}, Spec.getPositionProps()));

var Image = React.createClass({

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
      borderColor: props.borderColor
    };

    if (props.position) {
      style = assign(style, Spec.propsToPosition(props));
    }

    return <img style={style} src={this.props.src} alt={this.props.alt} />
  }
});

module.exports = Image;

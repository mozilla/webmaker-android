var React = require('react/addons');

function validateDefinition(spec) {
  Object.keys(spec).forEach(key => {
    var prop = spec[key];
    if (['styles', 'attributes'].indexOf(prop.category) <= -1) {
      throw new Error(prop.category + ' is not a valid category definition for ' + key);
    }
  });
}

function Spec(type, spec) {
  validateDefinition(spec);
  this.type = type;
  this.spec = spec;
};

Spec.validateDefinition = validateDefinition;

Spec.getPositionProps = function () {
  return {
    angle: {
      category: 'styles',
      validation: React.PropTypes.number,
      default: 0
    },
    scale: {
      category: 'styles',
      validation: React.PropTypes.number,
      default: 1
    },
    x: {
      category: 'styles',
      validation: React.PropTypes.number,
      default: 0
    },
    y: {
      category: 'styles',
      validation: React.PropTypes.number,
      default: 0
    },
    zIndex: {
      category: 'styles',
      validation: React.PropTypes.number,
      default: 0
    }
  };
};

Spec.propsToPosition = function (props) {
  return {
    position:'absolute',
    top: 0,
    left: 0,
    transform: [
      'translate('+props.x+'px, '+props.y+'px)',
      'rotate('+(props.angle * 180/Math.PI)+'deg)',
      'scale('+props.scale+')'
    ].join(' '),
    transformOrigin: 'center',
    zIndex: props.zIndex
  };
};

Spec.prototype.copy = function () {
  return JSON.parse(JSON.stringify(this.spec));
};

Spec.prototype.getDefaultProps = function () {
  var props = this.spec;
  var result = {};
  Object.keys(props).forEach(prop => {
    result[prop] = props[prop].default;
  });
  return result;
};

Spec.prototype.getPropTypes = function () {
  var props = this.spec;
  var result = {};
  Object.keys(props).forEach(prop => {
    result[prop] = props[prop].validation
  });
  return result;
};

Spec.prototype.flatten = function (props, options) {
  options = options || {};
  var element = JSON.parse(JSON.stringify(props));

  Object.keys(this.spec).forEach(key => {
    var category = this.spec[key].category;
    if (!element[category]) element[category] = {};
    if (typeof element[category][key] !== 'undefined') {
      element[key] = element[category][key];
    } else if (options.defaults) {
      element[key] = this.spec[key].default;
    }
  });

  delete element.styles;
  delete element.attributes;

  return element;
};

Spec.prototype.expand = function (props, options) {
  options = options || {};
  var element = JSON.parse(JSON.stringify(props));

  Object.keys(this.spec).forEach(key => {
    var category = this.spec[key].category;
    if (!element[category]) element[category] = {};
    if (typeof element[key] !== 'undefined') {
      element[category][key] = element[key];
      delete element[key];
    } else if (options.defaults) {
      element[category][key] = this.spec[key].default;
    }
  });

  return element;
};

Spec.prototype.generate = function (props) {
  var result = this.expand(props || {}, {defaults: true});
  result.type = this.type;
  return result;
};

module.exports = Spec;

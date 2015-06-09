var React = require('react/addons');

function getValidationErrors(spec) {
  var result = null;
  var VALID_KEYS = ['category', 'default', 'validation', 'editor'];
  var VALID_CATEGORIES = ['styles', 'attributes'];

  var keys = Object.keys(spec);

  if (!keys.length) {
    result = 'Spec must have at least one prop';
  }

  keys.forEach(key => {
    var prop = spec[key];
    Object.keys(prop).forEach(propKey => {
      if (VALID_KEYS.indexOf(propKey) <= -1) {
        result = key + ' is not a valid key';
      }
    });
    if (VALID_CATEGORIES.indexOf(prop.category) <= -1) {
      result = prop.category + ' is not a valid category definition for ' + key;
    }
  });

  return result;
}

function Spec(type, spec) {
  if (typeof type !== 'string' || typeof spec !== 'object') {
    throw new Error('Spec takes two params: type (String) and spec (Object)');
  }

  var error = getValidationErrors(spec);
  if (error) {
    throw new Error(error);
  }

  this.type = type;
  this.spec = spec;
}

Spec.getValidationErrors = getValidationErrors;

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
    transform: [
      `translate(${props.x}px, ${props.y}px)`,
      `rotate(${props.angle * 180/Math.PI}deg)`,
      `scale(${props.scale})`
    ].join(' '),
    transformOrigin: 'center',
    zIndex: props.zIndex
  };
};

Spec.prototype.getDefaultProps = function () {
  var props = this.spec;
  var result = {};
  Object.keys(props).forEach(prop => {
    if (typeof props[prop].default === 'function') {
      result[prop] = props[prop].default();
    } else if (typeof props[prop].default !== 'undefined') {
      result[prop] = props[prop].default;
    }
  });
  return result;
};

Spec.prototype.getPropTypes = function () {
  var props = this.spec;
  var result = {};
  Object.keys(props).forEach(prop => {
    if (typeof props[prop].validation !== 'undefined') {
      result[prop] = props[prop].validation;
    }
  });
  return result;
};

Spec.prototype.flatten = function (props, options) {
  options = options || {};
  props = props || {};
  var element = JSON.parse(JSON.stringify(props));

  var defaults = this.getDefaultProps();

  Object.keys(this.spec).forEach(key => {
    var category = this.spec[key].category;
    if (!element[category]) {
      element[category] = {};
    }

    if (typeof element[category][key] !== 'undefined') {
      element[key] = element[category][key];
    } else if (options.defaults) {
      if (typeof defaults[key] !== 'undefined') {
        element[key] = defaults[key];
      }
    }
  });

  delete element.styles;
  delete element.attributes;

  return element;
};

Spec.prototype.expand = function (props, options) {
  options = options || {};
  props = props || {};
  var element = JSON.parse(JSON.stringify(props));

  var defaults = this.getDefaultProps();

  Object.keys(this.spec).forEach(key => {
    var category = this.spec[key].category;
    if (!element[category]) {
      element[category] = {};
    }

    if (typeof element[key] !== 'undefined') {
      element[category][key] = element[key];
      delete element[key];
    } else if (options.defaults) {
      if (typeof defaults[key] !== 'undefined') {
        element[category][key] = defaults[key];
      }
    }
  });

  return element;
};

Spec.prototype.generate = function (props) {
  props = props || {};
  props.type = this.type;
  var result = this.expand(props || {}, {defaults: true});
  return result;
};

Spec.prototype.isStyleOrAttribute = function (name) {
  var category;
  Object.keys(this.spec).forEach((key) => {
    if (key === name) {
      category = this.spec[key].category;
    }
  });
  return category;
};

module.exports = Spec;

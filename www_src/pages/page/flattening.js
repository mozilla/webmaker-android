var types = require('../../components/basic-element/basic-element.jsx').types;
module.exports = {
  flatten: function (element) {
    if (!types[element.type]) {
      return false;
    }
    return types[element.type].spec.flatten(element);
  },

  expand: function (element) {
    if (!types[element.type]) {
      return false;
    }
    return types[element.type].spec.expand(element);
  }
};

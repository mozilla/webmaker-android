var React = require('react');
var uuid = require('../lib/uuid');

var Generator = function(){};

Generator.TEXT = "text";
Generator.LINK = "link";
Generator.IMAGE = "image";

Generator.blocks = {};
Generator.blocks[Generator.TEXT] = require('./text.jsx');
Generator.blocks[Generator.LINK] = require('./link.jsx');
Generator.blocks[Generator.IMAGE] = require('./image.jsx');

Generator.generateDefinition = function(type, props) {
  return Generator.blocks[type].spec.generate(props);
};

module.exports = Generator;

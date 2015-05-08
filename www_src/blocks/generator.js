var React = require('react');
var Text = require('./text.jsx');
var Link = require('./link.jsx');
var Image = require('./image.jsx');
var uuid = require('../lib/uuid');

var Generator = function(){};

Generator.TEXT = "text";
Generator.LINK = "link";
Generator.IMAGE = "image";

Generator.generateBlock = function(options) {
  if (options.type === Generator.TEXT) {
    return <Text {...options} />;
  }
  if (options.type === Generator.LINK) {
   return <Link {...options} />;
  }
  if (options.type === Generator.IMAGE) {
    return <Image {...options} />;
  }
  return false;
};

Generator.generateDefinition = function(type, options) {
  options.id = uuid();
  var def = JSON.parse(JSON.stringify(options));
  def.type = type;
  return def;
};

module.exports = Generator;

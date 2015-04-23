var React = require('react');
var Text = require('./Text.jsx');
var Link = require('./Link.jsx');
var Image = require('./Image.jsx');

var Generator = function(){};

Generator.TEXT = "text";
Generator.LINK = "link";
Generator.IMAGE = "image";

Generator.generateBlock = function(options) {
  if (options.type === Generator.TEXT) {
    return <Text value={options.value} />;
  }
  if (options.type === Generator.LINK) {
   return <Link href={options.href} label={options.label} active={options.active}/>;
  }
  if (options.type === Generator.IMAGE) {
    return <Image src={options.src} alt={options.alt} />;
  }
  return false;
};

Generator.generateDefinition = function(type, options) {
  var def = JSON.parse(JSON.stringify(options));
  def.type = type;
  return def;
};

module.exports = Generator;

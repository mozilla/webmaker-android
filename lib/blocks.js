var bulk = require('bulk-require');
var clone = require('clone');

var blockModels = bulk(__dirname + '/../blocks', '**/*.js');
module.exports = function Blocks() {
  var self = this;
  for (var type in blockModels) {
    if (blockModels.hasOwnProperty(type)) {
      self[type] = clone(blockModels[type].index.data);
      self[type].type = type;
    }
  }
};

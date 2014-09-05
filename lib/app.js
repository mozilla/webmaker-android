var Blocks = require('./blocks');
var utils = require('./utils');

var model = require('./model');
var blocks = new Blocks();

function newBlock(blockId) {
    var block = blocks[blockId];
    if (!block) throw new Error('Block type ' + blockId + ' not found.');
    return JSON.parse(JSON.stringify(block));
}

function App (id) {
    var self = this;

    self.id = id;
    self.index = utils.findInArray(model.apps, 'id', self.id);
    self.data = model.apps[self.index];
}

App.prototype.insert = function (blockId) {
    var self = this;
    var block = newBlock(blockId);
    self.data.blocks.unshift(block);
};

App.prototype.remove = function (blockIndex) {
    var self = this;
    if (!self.data.blocks[blockIndex]) throw new Error('Block with index ' + blockIndex + ' does not exist.')
    self.data.blocks.splice(blockIndex, 1);
};

module.exports = App;

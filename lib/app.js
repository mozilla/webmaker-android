var Blocks = require('./blocks');
var utils = require('./utils');
var clone = require('clone');

var model = require('./model')();
var blocks = new Blocks();

function newBlock(blockId) {
    var block = blocks[blockId];
    return block && clone(block);
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
    if (!block) {
        console.error('Block type ' + blockId + ' not found.');
        return;
    }
    self.data.blocks.unshift(block);
};

App.prototype.remove = function (blockIndex) {
    var self = this;
    if (!self.data.blocks[blockIndex]) {
        console.error('Block with index ' + blockIndex + ' does not exist.');
        return;
    }
    self.data.blocks.splice(blockIndex, 1);
};

module.exports = App;

var i18n;
var clone = require('clone');
var Blocks = require('./blocks');

// This is, without question, a hack for getting various bits into the App.
// That said, these work, and satisfy refactor criteria before optimization.
var App = function App(options) {
  if (!i18n) {
    i18n = options.i18n;
  }

  this.id = options.id;
  this.data = options.data || null;
  this.store = options.store;
  this.firebase = options.firebase || this.store._firebase.child(this.id);

  this.blocks = new Blocks();
  this.firebase.on('value', this.broadcast, this);
};

App.prototype = {
  broadcast: function (snapshot) {
    var process = this.store._processSnapshot;
    var data = process(snapshot);
    this.data = data;
    this.store._vm.$broadcast(snapshot.key(), this.data);
  },

  newBlock: function (blockId) {
    var block = this.blocks[blockId];
    if (!block) {
      return;
    }
    var clonedBlock = clone(block);
    if (['text', 'phone', 'sms', 'submit'].indexOf(block.type) !== -1) {
      clonedBlock.attributes.innerHTML.value =
        i18n.get(clonedBlock.attributes.innerHTML.value);
    }
    return clonedBlock;
  },

  update: function (properties, onUpdate) {
    var self = this;
    properties = JSON.parse(JSON.stringify(properties));
    self.firebase.update(properties, self.store._onSync);
    if (onUpdate) {
      onUpdate(properties);
    }
  },

  updateBlock: function (id, properties) {
    var self = this;
    properties = JSON.parse(JSON.stringify(properties));
    self.firebase.child('blocks/' + id).update(properties, self.store._onSync);
  },

  insert: function (type, onInsert) {
    var self = this;
    var block = this.newBlock(type);
    if (!block) {
      console.error('Block type ' + type + ' not found.');
      return;
    }
    var ref = self.firebase.child('blocks');
    ref.once('value', function (snapshot) {
      var blocks = snapshot.val() || [];
      blocks.unshift(block);
      ref.set(blocks);
      if (onInsert) {
        onInsert(blocks);
      }
    });
  },

  remove: function (blockIndex, onRemove) {
    var self = this;
    var ref = self.firebase.child('blocks');

    var msg = 'Block with index ' + blockIndex + ' does not exist.';
    ref.once('value', function (snapshot) {
      var blocks = snapshot.val();
      if (!blocks[blockIndex]) {
        console.error(msg);
        return;
      }
      blocks.splice(blockIndex, 1);
      ref.set(blocks, self.store._onSync);
      if (onRemove) {
        onRemove(blocks);
      }
    });
  },

  duplicate: function (blockIndex, onDuplicate) {
    var self = this;
    var ref = self.firebase.child('blocks');

    var msg = 'Block with index ' + blockIndex + ' does not exist.';
    ref.once('value', function (snapshot) {
      var blocks = snapshot.val();
      if (!blocks[blockIndex]) {
        console.error(msg);
        return;
      }

      blocks.splice(blockIndex, 0, clone(blocks[blockIndex]));
      ref.set(blocks, self.store._onSync);
      if (onDuplicate) {
        onDuplicate(blocks);
      }
    });
  },

  move: function (blockIndex, steps, onMoved) {
    var self = this;
    var ref = self.firebase.child('blocks');

    ref.once('value', function (snapshot) {
      var blocks = snapshot.val();
      if (blockIndex + steps < 0) {
        return console.error('Can\'t move block to negative position');
      }
      if (blockIndex + steps > blocks.length - 1) {
        return console.error('Block is already at the end of the list');
      }
      if (!blocks[blockIndex]) {
        return console.error('Block ' + blockIndex + ' doesn\'t exist.');
      }
      var blockToMove = blocks[blockIndex];
      // remove block from array
      blocks.splice(blockIndex, 1);
      // Put block in new array position
      blocks.splice(blockIndex + steps, 0, blockToMove);
      ref.set(blocks, self.store._onSync);
      if (onMoved) {
        onMoved(blocks);
      }
    });
  },

  removeApp: function () {
    var self = this;
    self.firebase.remove(self.store._onSync);
    this.store._removeAppRef(this.id);
  }
};

module.exports = App;

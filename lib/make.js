/**
 * Make abstraction.
 *
 * @package appmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var extend = require('extend');

// TODO https://github.com/parroit/folderify
var blocks = {
    headline: require('../blocks/headline'),
    image: require('../blocks/image'),
    paragraph: require('../blocks/paragraph'),
    sms: require('../blocks/sms')
};

var model = require('./model');

/**
 * Returns an app from storage matching the provided ID.
 *
 * @param {string} id App ID
 *
 * @return {int}
 */
function getMakeIndex (id) {
    for (var i = 0; i < model.apps.length; i++) {
        if (model.apps[i].id !== id) continue;
        return i;
    }
}

/**
 * Returns an app clone from storage at the specified index.
 *
 * @param  {int} index App index
 *
 * @return {object}
 */
function getMakeMeta (i) {
    return JSON.parse(JSON.stringify(model.apps[i]));
}

/**
 * Returns a block clone matching the provided ID.
 *
 * @param {string} id Block ID
 *
 * @return {object}
 */
function getBlock (id) {
    return {
        id: id,
        attributes: JSON.parse(JSON.stringify(blocks[id].data.attributes))
    };
}

/**
 * Constructor
 */
function Make (id) {
    var self = this;

    self.id = id;
    self.index = getMakeIndex(id);
    self.meta = getMakeMeta(self.index);
}

Make.prototype.updateName = function (name) {
    this.meta.name = name;
    model.apps[this.index].name = name;
};

Make.prototype.insert = function (id) {
    var self = this;
    model.apps[this.index].blocks.unshift(getBlock(id));
    self.meta.blocks.unshift(getBlock(id));
};

Make.prototype.update = function (index, attributes) {
    var self = this;
    if (!model.apps[this.index] || !model.apps[this.index].blocks[index]) {
        // The app or block was probably deleted
        return;
    }
    model.apps[this.index].blocks[index].attributes = attributes;
    self.meta.blocks[index].attributes = attributes;
};

Make.prototype.remove = function (index) {
    var self = this;
    model.apps[this.index].blocks.splice(index, 1);
    self.meta.blocks.splice(index, 1);
};

/**
 * Export
 */
module.exports = Make;

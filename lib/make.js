/**
 * Make abstraction.
 *
 * @package appmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var extend = require('extend');

var blocks = require('./blocks');
var model = require('./model');

/**
 * Returns an app from storage matching the provided ID.
 *
 * @param {string} id App ID
 *
 * @return {object}
 */
function getMake (id) {
    for (var i = 0; i < model.apps.length; i++) {
        if (model.apps[i].id !== id) continue;
        return model.apps[i];
    }
}

/**
 * Returns a block matching the provided ID.
 *
 * @param {string} id Block ID
 *
 * @return {object}
 */
function getBlock (id) {
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].id !== id) continue;
        return blocks[i];
    }
}

/**
 * Constructor
 */
function Make (id) {
    extend(true, this, getMake(id));
}

Make.prototype.insert = function (id) {
    this.blocks.unshift(getBlock(id));
};

Make.prototype.update = function (index, attributes) {
    this.blocks[index].attributes = attributes;
};

Make.prototype.remove = function (index) {
    this.blocks.splice(index, 1);
};

/**
 * Export
 */
module.exports = Make;

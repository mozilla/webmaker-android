var fs = require('fs');
var assert = require('assert');

// Patch require
require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var Blocks = require('../../lib/blocks');
var blocks = new Blocks();

function isValidType(id, property, type) {
    return blocks[id][property] && typeof blocks[id][property] === type;
}

describe('Blocks', function () {
    it('should be an object', function () {
        assert(blocks instanceof Object);
    });

    for (var type in blocks) {
        it ('block type ' + type + ' should have correct properties', function () {
            assert(blocks[type].type === type);
            assert(isValidType(type, 'name', 'string'));
            assert(isValidType(type, 'icon', 'string'));
            assert(isValidType(type, 'attributes', 'object'));
        });
    }
});

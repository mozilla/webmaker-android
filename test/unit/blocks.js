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

    for (var id in blocks) {
        it ('block type ' + id + ' should have correct properties', function () {
            assert(blocks[id].id === id);
            assert(isValidType(id, 'name', 'string'));
            assert(isValidType(id, 'icon', 'string'));
            assert(isValidType(id, 'attributes', 'object'));
        });
    }
});

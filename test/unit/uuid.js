window = {};

var assert = require('assert');
var uuid = require('../../lib/uuid');

var suite = [];
for (var i = 0; i < 100; i++) {
    suite.push(uuid());
}

function hasDuplicates (array) {
    var valuesSoFar = {};
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (Object.prototype.hasOwnProperty.call(valuesSoFar, value)) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}

describe('UUID', function () {
    describe('interface', function () {
        it ('should be a function', function () {
            assert.equal(typeof uuid, 'function');
        });

        it ('should return a string', function () {
            assert.equal(typeof uuid(), 'string');
        });
    });

    describe('RFC', function () {
        it ('should return a string of the expected length', function () {
            assert.equal(uuid().length, 36);
        });

        it ('should not repeat', function () {
            assert.equal(hasDuplicates(suite), false);
        });
    });
});

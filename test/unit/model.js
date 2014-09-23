window = {};

var assert = require('assert');
var model = require('../../lib/model')({
    memory: true,
    noConnect: true
});

describe('Model', function () {
    describe('interface', function () {
        it('should expose expected objects', function () {
            assert.equal(typeof model.history, 'object');
            assert.equal(typeof model.user, 'object');
            assert.equal(typeof model.apps, 'object');
        });

        it('should expose expected functions', function () {
            assert.equal(typeof model.restore, 'function');
            assert.equal(typeof model.save, 'function');
            assert.equal(typeof model.observe, 'function');
        });
    });

    describe('first run', function () {
        it('should have the expected history', function () {
            assert.deepEqual(model.history, {
                ftu: true,
                path: '/ftu'
            });
        });

        it('should have the expected user', function () {
            // @todo
            assert.deepEqual(model.user, {
                name: null,
                location: null,
                avatar: null
            });
        });

        it('should have the expected apps', function () {
            // @todo
            assert.equal(model.apps.length, 0);
        });
    });
});

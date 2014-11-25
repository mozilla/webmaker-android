window = {};
var assert = require('assert');
var model = require('../../lib/model')({
    memory: true,
    noConnect: true
});

describe('Model', function () {
    describe('interface', function () {
        it('should expose expected properties', function () {
            assert.equal(typeof model.data.session, 'object');
            assert.equal(typeof model.data.session.user, 'object');
        });

        it('should expose expected functions', function () {
            assert.equal(typeof model.restore, 'function');
            assert.equal(typeof model.save, 'function');
            assert.equal(typeof model.observe, 'function');
        });
    });

    describe('first run', function () {
        it('should have the expected session', function () {
            assert.equal(model.data.session.ftu, true);
            assert.equal(model.data.session.path, '/sign-in');
            assert.equal(model.data.session.locale, null);
            assert.equal(model.data.session.offline, false);
            assert(model.data.session.guestId);
        });

        it('should have the expected user', function () {
            // @todo
            assert.deepEqual(model.data.session.user, {});
        });

    });
});

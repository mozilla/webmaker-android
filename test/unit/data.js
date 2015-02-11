var assert = require('assert');
var Data = require('../../lib/data');

var data = new Data('test');

describe('Data', function () {
    describe('interface', function () {
        it('should expose expected objects', function () {
            assert.equal(typeof data.db, 'object');
        });

        it('should expose expected functions', function () {
            assert.equal(typeof data.save, 'function');
            assert.equal(typeof data.fetch, 'function');
            assert.equal(typeof data.delete, 'function');
        });
    });

    describe('save', function () {
        it('should return no errors', function (done) {
            data.save({'foo': 'bar'}, function (err) {
                assert.equal(err, null);
                done();
            });
        });
    });

    describe('fetch', function () {
        it('should return a dataset', function (done) {
            data.fetch(function (err, data) {
                assert.equal(err, null);
                assert.ok(typeof data, 'object');
                assert.ok(data instanceof Array);
                done();
            });
        });
    });

    describe('delete', function () {
        it('should return no errors', function (done) {
            data.delete('foobar', function (err) {
                assert.equal(err, null);
                done();
            }); 
        });
    });
});

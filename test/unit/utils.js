window = {};

var assert = require('assert');
var utils = require('../../lib/utils');

var testArray = [
    {name: 'kate'},
    {name: 'andrew'}
];

describe('utils', function () {

    describe('objectToArray', function () {
        it('should convert an object with literal values to an array', function () {
            var obj = {a: 1, b: 'b', c: true, d: null};
            var result = [1, 'b', true, null];
            assert.deepEqual(utils.toArray(obj), result);
        });
        it('should convert an object to array and add __key', function () {
            var obj = {a: {a: 'a'}, b: {b: 'b'}, c: {c: 'c'}};
            var obj2 = {a: {a: 'a'}, b: {b: 'b'}, c: {c: 'c'}};
            var result = [{a: 'a', __key: 'a'}, {b: 'b', __key: 'b'}, {c: 'c', __key: 'c'}];
            var result2 = [{a: 'a', id: 'a'}, {b: 'b', id: 'b'}, {c: 'c', id: 'c'}];
            assert.deepEqual(utils.toArray(obj), result);
            assert.deepEqual(utils.toArray(obj2, 'id'), result2);
        });
        it('should not add __key if second param is false', function () {
            var obj = {a: {a: 'a'}, b: {b: 'b'}};
            var result = [{a: 'a'}, {b: 'b'}];
            assert.deepEqual(utils.toArray(obj, false), result);
        });
        it('should work for arrays as well', function () {
            var arr = [1, 2, 3];
            assert.deepEqual(utils.toArray(arr), arr);
            var arr2 = [{one: 1}, {two: 2}];
            var result = [{one: 1, __key: 0}, {two: 2, __key: 1}];
            assert.deepEqual(utils.toArray(arr2), result);
        });
    });

    describe('findInArray', function () {
        it('should find the index of an obj in an array', function () {
            assert.equal(utils.findInArray(testArray, 'name', 'kate'), 0);
        });
        it('should return undefined if obj not found', function () {
            var a = utils.findInArray(testArray, 'name', 'bobby');
            var b = utils.findInArray(testArray, 'NAME', 'andrew');
            assert.equal(a, undefined);
            assert.equal(b, undefined);
        });
    });

    describe('shadeColor', function () {
        it('should lighten a colour by 10%', function () {
            assert.equal(utils.shadeColor('#888888', 10), '#a2a2a2');
        });
        it('should darken a colour by 10%', function () {
            assert.equal(utils.shadeColor('#888888', -10), '#6f6f6f');
        });
        it('should stop at #000000 and #FFFFFF', function () {
            assert.equal(utils.shadeColor('#000000', -50), '#000000');
            assert.equal(utils.shadeColor('#ffffff', 50), '#ffffff');
        });
    });

});

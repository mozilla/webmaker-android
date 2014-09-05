var mockrequire = require('mockrequire');
var assert = require('assert');

var mockId = '000d1745-5d3c-4997-ac0c-15df68bbbecz';
var mockModel = {
    apps: [
        {
            id: mockId,
            name: 'Sample App',
            icon: '/images/placeholder_puppy.png',
            author: {
                name: 'Andrew',
                location: 'Portland',
                avatar: '/images/avatar_puppy.png'
            },
            blocks: []
        }
    ]
};

// blocks doesn't frickin work because we can't require html files *cries*
var mockBlocks = function (id) {
    this.headline = {
        id: 'headline',
        className: 'headline',
        template: '<h1></h1>',
        data: {
            name: 'Headline',
            icon: '/images/blocks_text.png',
            attributes: {
                innerHTML: {
                    label: 'Text',
                    type: 'string',
                    value: 'I am a Headline'
                },
                color: {
                    label: 'Color',
                    type: 'color',
                    value: '#333444'
                }
            }
        }
    };
};

var App = mockrequire('../../lib/app', {
    './model': mockModel,
    './blocks': mockBlocks
});

var app = new App(mockId);

describe('App', function () {
    describe('interface', function () {
        it('should have expected properties', function () {
            assert.equal(app.id, mockId);
            assert.equal(app.index, 0);
            assert.equal(app.data, mockModel.apps[0]);
        });

        it('should have expected functions', function () {
            assert.equal(typeof app.insert, 'function');
            assert.equal(typeof app.remove, 'function');
        });
    });

    describe('insert', function () {
        it('should insert a block', function () {
            app.insert('headline');
            assert.equal(app.data.blocks[0].id, 'headline');
        });
        it('should throw if the blockId does not exist', function () {
            assert.throws(function () {
                app.insert('banana');
            }, function (err) {
                return err.message === 'Block type banana not found.'
            });
        });
    });

    describe('remove', function () {
        it('should remove a block', function () {
            app.remove(0);
            assert.equal(app.data.blocks.length, 0);
        });
        it('should throw if the block index does not exist', function () {
            assert.throws(function () {
                app.remove(100);
            }, function (err) {
                return err.message === 'Block with index 100 does not exist.'
            });
        });
    });

});



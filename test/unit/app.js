var mockrequire = require('mockrequire');
var assert = require('assert');
var mockId = '000d1745-5d3c-4997-ac0c-15df68bbbecz';
var mockModelInstance = {
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
var mockModel = function() {
    return mockModelInstance;
};

// blocks doesn't frickin work because we can't require html files *cries*
var mockBlocks = function (id) {
    this.text = {
        id: 'text',
        className: 'text',
        template: '<p></p>',
        data: {
            name: 'Text',
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
    './blocks': mockBlocks,
    'clone': require('clone')
});

var app = new App(mockId);

describe('App', function () {
    describe('interface', function () {
        it('should have expected properties', function () {
            assert.equal(app.id, mockId);
            assert.equal(app.index, 0);
            assert.equal(app.data, mockModelInstance.apps[0]);
        });

        it('should have expected functions', function () {
            assert.equal(typeof app.insert, 'function');
            assert.equal(typeof app.remove, 'function');
        });
    });

    describe('insert', function () {
        it('should insert a block', function () {
            app.insert('text');
            assert.equal(app.data.blocks[0].id, 'text');
        });
        it('should do nothing if the blockId does not exist', function () {
            var oldLength = app.data.blocks.length;
            app.insert('banana');
            assert.equal(app.data.blocks.length, oldLength)
        });
    });

    describe('remove', function () {
        it('should remove a block', function () {
            app.remove(0);
            assert.equal(app.data.blocks.length, 0);
        });
        it('should do nothing if the block index does not exist', function () {
            var oldLength = app.data.blocks.length;
            app.remove(100);
            assert.equal(app.data.blocks.length, oldLength);
        });
    });

});



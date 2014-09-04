var block = require('../../lib/block');

module.exports = block.extend({
    className: 'paragraph',
    template: require('./index.html'),
    data: {
        name: 'Paragraph',
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
});

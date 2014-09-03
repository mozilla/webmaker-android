var block = require('../../lib/block');

module.exports = block.extend({
    className: 'image',
    template: require('./index.html'),
    data: {
        name: 'Image',
        attributes: {
            src: {
                label: 'Source',
                type: 'string',
                value: '/images/placeholder.png'
            }
        }
    }
});

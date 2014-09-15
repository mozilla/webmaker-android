module.exports = {
    className: 'text',
    template: require('./index.html'),
    data: {
        name: 'Text',
        icon: '/images/blocks_text.png',
        attributes: {
            innerHTML: {
                label: 'Text',
                type: 'string',
                value: 'I am some text'
            },
            color: {
                label: 'Color',
                type: 'color',
                value: '#333444'
            },
            'font-size': {
                label: 'Font Size',
                type: 'font-size',
                value: '14'
            }
        }
    }
};

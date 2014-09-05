module.exports = {
    className: 'headline',
    template: require('./index.html'),
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

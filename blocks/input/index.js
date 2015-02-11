module.exports = {
    className: 'input-block',
    template: require('./index.html'),
    lazy: false,
    data: {
        name: 'Text Box',
        icon: 'images/blocks_input.png',
        attributes: {
            label: {
                label: 'Title',
                type: 'string',
                value: '',
                placeholder: 'Your title goes here',
                skipAutoRender: true
            },
            color: {
                label: 'Title Text Color',
                type: 'color',
                value: '#638093'
            }
        }
    }
};

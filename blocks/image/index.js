module.exports = {
    className: 'image',
    template: require('./index.html'),
    data: {
        name: 'Image',
        icon: 'images/blocks_image.png',
        attributes: {
            src: {
                label: 'Source',
                type: 'image',
                value: 'images/placeholder.png'
            }
        }
    }
};

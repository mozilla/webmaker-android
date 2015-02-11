module.exports = {
    className: 'link',
    template: require('./index.html'),
    data: {
        name: 'Link',
        icon: 'images/blocks_link.svg',
        attributes: {
            link: {
                label: 'URL',
                type: 'input',
                value: '',
                placeholder: 'https://mozilla.org'
            },
            text: {
              label: 'Link Text',
              type: 'input',
              value: '',
              placeholder: 'Mozilla'
            }
        }
    }
};

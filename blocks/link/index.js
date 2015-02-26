var utils = require('../../lib/utils');

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
                value: 'https://mozilla.org'
            },
            text: {
              label: 'Link Text',
              type: 'input',
              value: 'Mozilla'
            }
        }
    },
    methods: {
        openInBrowser: utils.openInBrowser
    }
};

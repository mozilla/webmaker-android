var view = require('../../lib/view');

module.exports = view.extend({
    id: 'apps',
    template: require('./index.html'),
    data: require('./data.json')
});

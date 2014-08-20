var view = require('../../lib/view');

module.exports = view.extend({
    id: 'templates',
    template: require('./index.html'),
    data: {
        personas: require('../../lib/templates.json')
    }
});

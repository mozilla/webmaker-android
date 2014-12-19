var view = require('../../lib/view');
var clone = require('clone');
var _config = require('../../config');
var config = clone(_config);
var packageJSON = clone(config.package);
delete config.package;

module.exports = view.extend({
    id: 'healthcheck',
    template: require('./index.html'),
    data: {
        title: 'Developer Health Check',
        back: true,
        config: config,
        package: packageJSON
    }
});

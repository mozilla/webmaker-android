var clone = require('clone');
var json = clone(require('./templates.json'));

module.exports = {
    featured: json.splice(1, 5),
    nearby: json.splice(5)
};

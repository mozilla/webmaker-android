var bulk = require('bulk-require');
var blockModels = bulk(__dirname + '/../blocks', '**/*.js');

module.exports = function Blocks() {
    var self = this;
    var defaultData;
    for (var id in blockModels) {
        defaultData = blockModels[id].options.defaultData;
        self[id] = JSON.parse(JSON.stringify(defaultData));
        self[id].id = id;
    }
};

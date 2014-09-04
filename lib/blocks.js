var bulk = require('bulk-require');
var blockModels = bulk(__dirname + '/../blocks', '**/*.js');

module.exports = function Blocks() {
    var self = this;
    for (var id in blockModels) {
        if (blockModels.hasOwnProperty(id)) {
            self[id] = JSON.parse(JSON.stringify(blockModels[id].options.defaultData));
            self[id].id = id;
        }
    }
};

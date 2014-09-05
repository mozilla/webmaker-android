var bulk = require('bulk-require');
var blockModels = bulk(__dirname + '/../blocks', '**/*.js');

module.exports = function Blocks() {
    var self = this;
    for (var id in blockModels) {
        console.log(blockModel);
        self[id] = JSON.parse(JSON.stringify(blockModels[id].data));
        self[id].id = id;
    }
};

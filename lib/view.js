var Vue = require('vue');
var clone = require('clone');

var bulk = require('bulk-require');
var block = require('./block');

// Add all blocks
var blocks = clone(bulk(__dirname + '/../blocks', '**/*.js'));

var componentList = [];

for (var id in blocks) {
    if (blocks.hasOwnProperty(id)) {
        componentList[id] = block.extend(blocks[id]);
    }
}

module.exports = Vue.extend({
    components: componentList,
    data: {},
    methods: {
        model: require('./model')(),
        page: require('page'),
        disableBlocks: function (e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
    }
});

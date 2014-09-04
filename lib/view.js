var Vue = require('vue');
var bulk = require('bulk-require');

var componentList = {
    appCell: require('../components/appCell'),
    makeBar: require('../components/makeBar'),
    navigationBar: require('../components/navigationBar'),
    tabBar: require('../components/tabBar'),
    templateCell: require('../components/templateCell')
};

// Add all blocks
var blocks = bulk(__dirname + '/../blocks', '**/*.js');
for (var id in blocks) {
    componentList[id] = blocks[id];
}

module.exports = Vue.extend({
    components: componentList,
    data: {},
    methods: {
        model: require('./model'),
        page: require('page')
    },
    created: function () {
        var self = this;

        self.$on('ping', function (e) {
            console.log(e);
            console.dir(self.user);
        });
    }
});

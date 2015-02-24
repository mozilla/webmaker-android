require('../lib/shims');

var Vue = require('vue');
var clone = require('clone');
var bulk = require('bulk-require');

// Todo: replace with subset
var i18n = require('../lib/i18n');
var locale = require('../locale');

var Data = require('../lib/data');
var block = require('../lib/block');
var blocks = clone(bulk(__dirname + '/../blocks', '**/*.js'));
var componentList = {};
componentList.publishHeader = require('../components/publishHeader');
componentList.publishFooter = require('../components/publishFooter');
componentList.alert = require('../components/alert');

// Load all components
for (var id in blocks) {
    componentList[id] = block.extend(blocks[id]);
}

// Register localization
i18n.bind(locale, Vue);

// App json
var json = window.App;

// Todo: more validation
json.blocks.forEach(function (block) {
    // Legacy
    if (block.id) block.type = block.id;
    delete block.id;
    if (block.type === 'image' &&
            block.attributes.src.value.match(/(^images\/)|(^content\/)/)) {
        block.attributes.src.value = '/' + block.attributes.src.value;
    }
});

i18n.setLocale('en-US', true);

var app = new Vue({
    el: '#app',
    components: componentList,
    data: {
        title: json.name,
        app: json
    },
    created: function () {
        var self = this;
        var data = new Data(json.id);
        self.$on('dataSave', function () {
            data.collect(this.$el, function onDataSave(err) {
                if (err) return console.log('[Firebase] ' + err);
                self.$broadcast('dataSaveSuccess');
            });
        });
    }
});


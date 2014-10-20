var Vue = require('vue');
var clone = require('clone');
var bulk = require('bulk-require');

// Todo: replace with subset
var i18n = require('../lib/i18n');
var locale = require('../locale');

var block = require('../lib/block');
var blocks = clone(bulk(__dirname + '/../blocks', '**/*.js'));
var componentList = {};
componentList.navigationBar = require('../components/navigationBar');
componentList.publishFooter = require('../components/publishFooter');

// Load all components
for (var id in blocks) {
    componentList[id] = block.extend(blocks[id]);
}

// Register localization
i18n.bind(locale, Vue);

// App json
var json = window.App;

i18n.setLocale('en-US', true);

var app = new Vue({
    el: '#app',
    components: componentList,
    data: {
        title: json.name,
        app: json
    }
});


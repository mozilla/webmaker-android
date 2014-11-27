var App = require('../../lib/app');
var view = require('../../lib/view');
var bulk = require('bulk-require');
var editorModels = bulk(
    __dirname + '/../../components/block-editors',
    '**/*.js');
var throttle = require('lodash.throttle');

var app = null;
var index = null;
var id = null;

// Rename editor components
for (id in editorModels) {
    if (editorModels.hasOwnProperty(id)) {
        editorModels[id + '-editor'] = editorModels[id];
        delete editorModels[id];
    }
}

id = null;

module.exports = view.extend({
    id: 'block',
    template: require('./index.html'),
    components: editorModels,
    data: {
        title: 'Edit',
        back: true
    },
    methods: {
        remove: function (e) {
            e.preventDefault();
            app.remove(index);
            global.history.back();
        },
        getEditor: function (type) {
            var editorKey = type + '-editor';
            var defaultEditor = 'string-editor';
            var legalComponents = this.$compiler.options.components;
            if (legalComponents[editorKey]) {
                return editorKey;
            }
            return defaultEditor;
        }
    },
    created: function () {
        var self = this;

        // Fetch app
        id = self.$parent.$data.params.id;
        index = self.$parent.$data.params.index;
        app = new App(id);
        app.storage.once('value', function (snapshot) {
            var app = snapshot.val();
            self.$root.isReady = true;
            if (!app || !app.blocks) return;
            self.$data.block = snapshot.val().blocks[index];
        });
        self.$data.index = index;
        var onChange = throttle(function (newVal) {
            if (!newVal) return;
            var clone = JSON.parse(JSON.stringify(newVal));
            app.updateBlock(index, {
                attributes: clone
            });
        }, 3000);
        self.$watch('block.attributes', onChange);
    }
});

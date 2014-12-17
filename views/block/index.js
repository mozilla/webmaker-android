var view = require('../../lib/view');
var bulk = require('bulk-require');
var editorModels = bulk(
    __dirname + '/../../components/block-editors',
    '**/*.js');
var clone = require('clone');
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
        // always false now. feel free to try stuff here
        saveDisabled: false
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
        },
        onSave: function (e) {
            e.preventDefault();
            app.updateBlock(index, {
                attributes: this.$data.block.attributes
            });
            this.page(this.$data.back);
        }
    },
    created: function () {
        var self = this;

        id = self.$root.$data.params.id;
        index = self.$root.$data.params.index;

        // Navigation
        self.$data.back = '/make/' + id;

        // Fetch app
        app = self.$root.storage.getApp(id);
        if (app.data && app.data.blocks) {
            self.$root.isReady = true;
            self.$data.block = clone(app.data.blocks[index]);
        } else {
            self.$once(id, function (val) {
               self.$root.isReady = true;
               if (!val || !val.blocks) return;
               self.$data.block = val.blocks[index];
           });
        }

        self.$data.index = index;
    }
});

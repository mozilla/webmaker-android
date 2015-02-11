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
Object.keys(editorModels).forEach(function (id) {
    editorModels[id + '-editor'] = editorModels[id];
    delete editorModels[id];
});

id = null;

module.exports = view.extend({
    id: 'block',
    template: require('./index.html'),
    components: editorModels,
    data: {
        title: 'Edit',
        saveDisabled: true
    },
    methods: {
        remove: function (e) {
            e.preventDefault();
            app.remove(index);
            this.page(this.$data.back);
        },
        getEditor: function (type) {
            var editorKey = type + '-editor';
            var legalComponents = this.$compiler.options.components;
            if (legalComponents[editorKey]) {
                return editorKey;
            }
            var defaultEditor = 'string-editor';
            return defaultEditor;
        },
        enableSave: function (e) {
            this.$data.saveDisabled = false;
        },
        onSave: function (e) {
            e.preventDefault();
            app.updateBlock(index, {
                attributes: this.$data.block.attributes
            });
            this.page(this.$data.back);
            this.$data.saveDisabled = true;
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

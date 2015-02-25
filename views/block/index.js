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
        // The following code has been commented off due to
        // https://github.com/mozilla/webmaker-app/issues/1046
        //saveDisabled: true
        saveDisabled: false
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
        disableSave: function (e) {
            // The following code has been commented off due to
            // https://github.com/mozilla/webmaker-app/issues/1046
            //this.$data.saveDisabled = true;
            this.$data.saveDisabled = false;
        },
        enableSave: function (e) {
            this.$data.saveDisabled = false;
        },
        onSave: function (e) {
            e.preventDefault();
            app.updateBlock(index, {
                attributes: this.$data.block.attributes
            });
            this.$data.saveDisabled = true;
            global.history.back();
            global.history.replaceState({}, '', this.$data.back);
        },
        onCancel: function (e) {
            e.preventDefault();
            if (this.$data.mode === "edit") {
                this.page(this.$data.back);
                return;
            }
            app.remove(index);
            var id = this.$root.$data.params.id;
            this.page('/make/' + id + '/add');
        }
    },
    created: function () {
        var self = this;
        var mode = self.$root.$data.params.mode;
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
        self.$data.mode = mode;
        self.$data.index = index;
    }
});

var Blocks = require('./blocks');
var utils = require('./utils');
var i18n = require('./i18n');
var clone = require('clone');
var templates = require('./templates.json');

var model = require('./model')();
var blocks = new Blocks();

function newBlock(blockId) {
    var block = blocks[blockId];
    return block && clone(block);
}

function App (id, ref) {
    var self = this;

    self.id = id;
    self.data = {};
    self.storage = ref || model.firebase.child(self.id);
    self.storage.on('value', function (snapshot) {
        var val = snapshot.val();

        if (!val)  {
            console.log('No app data for ' + self.id);
            return;
        }

        self.data = snapshot.val();
        self.data.id = snapshot.key();
        console.log('App loaded');
    });
}

// Global Methods

// createApp(options)
//  - template: id of a template. Will overwrite options.data
//  - data: a set of app data to clone
//  - name: a name for the clone.
App.createApp = function (options) {
    var templateId;
    options = options || {};
    if (options.template) {
        templateId = utils.findInArray(templates, 'id', options.template);
        options.data = templates[templateId];
    }
    if (!options.data) return;

    var app = clone(options.data);

    // User
    var user = model.data.session.user;

    // Prepare the clone for use
    delete app.id;
    app.name = options.name || i18n.get('My {{template}} App');
    app.name = app.name.replace('{{template}}', options.data.name);

    app.userId = user.id;
    app.author = {
        id: user.id,
        username: user.username || i18n.get('Guest')
    };

    var ref = model.firebase.push(app);

    return new App(ref.key(), ref);
};

App.prototype.update = function (properties) {
    var self = this;
    self.storage.update(properties);
};

App.prototype.updateBlock = function (index, properties) {
    var self = this;
    self.storage.child('blocks/' + index).update(properties);
};

// Instance Methods
App.prototype.insert = function (blockId) {
    var self = this;
    var block = newBlock(blockId);
    if (!block) {
        console.error('Block type ' + blockId + ' not found.');
        return;
    }
    if (!self.data.blocks) self.data.blocks = [];
    self.data.blocks.unshift(block);
    self.storage.update({
        blocks: clone(self.data.blocks)
    });

};

App.prototype.remove = function (blockIndex) {
    var self = this;
    if (!self.data.blocks[blockIndex]) {
        console.error('Block with index ' + blockIndex + ' does not exist.');
        return;
    }
    self.data.blocks.splice(blockIndex, 1);
    self.storage.update({
        blocks: clone(self.data.blocks)
    });
};

App.prototype.removeApp = function () {
    var self = this;
    self.storage.remove();
};

module.exports = App;

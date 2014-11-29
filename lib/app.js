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
    self.storage = ref || model.firebase.child(self.id);
}

// Global Methods

// createApp(options)
//  - template: id of a template. Will overwrite options.data
//  - data: a set of app data to clone
//  - name: a name for the clone.
App.createApp = function (options) {
    var templateId;
    options = options || {};

    var app = {};

    // Get the source of the app template
    if (options.template) {
        templateId = utils.findInArray(templates, 'id', options.template);
        options.data = templates[templateId];
    }
    if (!options.data) return;
    var appTemplate = clone(options.data);

    // Get current user info
    var user = model.data.session.user;
    var guestId = model.data.session.guestId;

    // Name, userId, author, icon
    app.name = options.name || i18n.get('My {{template}} App');
    app.name = app.name.replace('{{template}}', appTemplate.name);
    app.userId = user.id || guestId;
    app.author = {
        id: user.id || guestId,
        username: user.username || i18n.get('Guest')
    };
    app.icon = appTemplate.icon;

    // Blocks
    app.blocks = appTemplate.blocks.map(function (blockTemplate) {
        var block = {};
        // .id is deprecated
        block.type = blockTemplate.type || blockTemplate.id;
        block.attributes = blockTemplate.attributes;
        console.log(block);
        return block;
    });

    var ref = model.firebase.push(app);

    return new App(ref.key(), ref);
};

App.prototype.update = function (properties) {
    var self = this;
    self.storage.update(properties);
};

App.prototype.updateBlock = function (id, properties) {
    var self = this;
    self.storage.child('blocks/' + id).update(properties);
};

// Instance Methods
App.prototype.insert = function (type) {
    var self = this;
    var block = newBlock(type);
    if (!block) {
        console.error('Block type ' + type + ' not found.');
        return;
    }
    var ref = self.storage.child('blocks');
    ref.once('value', function (snapshot) {
        var blocks = snapshot.val();
        blocks.unshift(block);
        ref.set(blocks);
    });
};

App.prototype.remove = function (blockIndex) {
    var self = this;
    var ref = self.storage.child('blocks');

    var msg = 'Block with index ' + blockIndex + ' does not exist.';
    ref.once('value', function (snapshot) {
        var blocks = snapshot.val();
        if (!blocks[blockIndex]) {
            console.error(msg);
            return;
        }
        blocks.splice(blockIndex, 1);
        ref.set(blocks);
    });
};

App.prototype.removeApp = function () {
    var self = this;
    self.storage.remove();
};

module.exports = App;

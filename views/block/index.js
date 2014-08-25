var Make = require('../../lib/make');
var templates = require('../../lib/templates.json');
var view = require('../../lib/view');

var id = null;
var index = null;
var target = null;
var block = null;

module.exports = view.extend({
    id: 'block',
    template: require('./index.html'),
    data: {
        title: 'Edit',
        back: true
    },
    created: function () {
        var self = this;

        // Fetch app
        id = self.$parent.$data.params.id;
        index = self.$parent.$data.params.index;
        target = new Make(id);
        block = target.meta.blocks[index];
        // Bind app
        self.$data = block;
        self.$data.remove = function (e) {
            e.preventDefault();
            target.remove(index);
            global.history.back();
        };
    },
    detached: function () {
        var self = this;
        target.update(index, self.$data.attributes);
    }
});

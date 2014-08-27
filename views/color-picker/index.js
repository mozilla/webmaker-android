var view = require('../../lib/view');
var Make = require('../../lib/make');
var utils = require('../../lib/utils');

module.exports = view.extend({
    id: 'color-picker',
    template: require('./index.html'),
    created: function () {
        var self = this;
        var $data = self.$data;
        var id = self.$parent.$data.params.id;
        make = new Make(id);
        $data.blockIndex = self.$parent.$data.params.index;
        $data.block = make.meta.blocks[$data.blockIndex];
        $data.colorIndex = utils.findInArray($data.block.attributes, 'id', 'color');
        $data.selectedColor = $data.block.attributes[$data.colorIndex].value;
    },
    detached: function () {
        var $data = this.$data;
        $data.block.attributes[$data.colorIndex].value = $data.selectedColor;
        make.update($data.blockIndex, $data.block.attributes);
    },
    data: {
        back: true,
        title: 'Select Color',
        onSelect: function (color) {
            this.$data.selectedColor = color;
        },
        primaryColors: [
            'transparent',
            '#FC5D5E',
            '#FEE444',
            '#1CB0B4',
            '#31ABDF'
        ],
        colors: [
            'black',
            'purple',
            'salmon',
            'green',
            'blue',
            'pink',
            'yellow',
            'violet',
            'orange',
            'red'
        ]
    }
});

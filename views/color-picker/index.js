var view = require('../../lib/view');
var utils = require('../../lib/utils');

var colorGroups = [
    '#333444',
    '#1e79da',
    '#1F9CDF',
    '#18dea6',
    '#39d91f',
    '#e7ce17',
    '#ea6517',
    '#e71a18',
    '#ec1a6e',
    '#d91fd6'
];

var ref;

module.exports = view.extend({
    id: 'color-picker',
    template: require('./index.html'),
    created: function () {
        var self = this;
        var id = self.$root.$data.params.id;
        var index = self.$root.$data.params.index;
        var $data = self.$data;

        self.$data.back = '/make/' + id + '/block/' + index;

        // Create block reference
        var path = id + '/blocks/' + index + '/attributes/color/value';
        ref = self.$root.storage._firebase.child(path);

        ref.once('value', function (snapshot) {
            var val = snapshot.val();
            self.$root.isReady = true;
            if (!val) return;
            $data.selectedColor = val;

            $data.colors.forEach(function (arr, i) {
                arr.forEach(function (color) {
                    if (color === val) {
                        $data.selectedGroup = i;
                    }
                });
                $data.selectedGroup = $data.selectedGroup || 0;
            });

            if (colorGroups.indexOf($data.selectedColor) > -1) {
                $data.mode = 'group';
            } else {
                $data.mode = 'single';
            }
        });
    },
    data: {
        title: 'Select Color',
        selectFromGroup: function (color) {
            this.$data.selectedColor = color;
            ref.set(color);
        },
        onSelect: function (color) {
            this.$data.selectedColor = color;
            this.$data.mode = 'single';
            ref.set(color);
        },
        onGroupSelect: function (i) {
            this.$data.selectedGroup = i;
            this.selectFromGroup(colorGroups[i]);
            this.$data.mode = 'group';
        },
        colorGroups: colorGroups,
        colors: colorGroups.map(function (base) {
            var tints = [];
            for (var i = -5; i < 10; i++) {
                var colorString = utils.shadeColor(base, i * 6);
                colorString = colorString.toUpperCase();
                tints.push(colorString);
            }
            return tints;
        })
    }
});

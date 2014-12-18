var utils = require('../../lib/utils');

var colorGroups = utils.baseColors;

module.exports = {
    className: 'color-picker',
    template: require('./index.html'),
    computed: {
        selectedGroup: function () {
            var groups = this.$data.colorGroups;
            var selected = this.$data.selectedColor;
            var index;
            this.$data.colors.forEach(function (group, groupIndex) {
                if (selected === groups[groupIndex]) {
                    index = groupIndex;
                    return;
                }
                group.forEach(function (color) {
                    if (selected === color) index = groupIndex;
                });
            });
            return index || 0;
        }
    },
    methods: {
        onColorSelect: function (color) {
            this.selectedColor = color;
        },
        onClose: function (e) {
            e.preventDefault();
            this.$data.show = false;
        }
    },
    data: {
        colorGroups: colorGroups,
        colors: colorGroups.map(function (base) {
            var tints = [];
            for (var i = -5; i < 11; i++) {
                var colorString = utils.shadeColor(base, i * 6);
                colorString = colorString.toUpperCase();
                if (base !== colorString) tints.push(colorString);
            }
            return tints;
        })
    }
};

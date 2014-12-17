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

module.exports = {
    className: 'color-picker',
    template: require('./index.html'),
    computed: {
        selectedGroup: function () {
            var groups = this.$data.colorGroups;
            var selected = this.$data.selectedColor;
            var index;
            this.$data.colors.forEach(function (group, groupIndex) {
                if (selected === groups[groupIndex]) return index = groupIndex;
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

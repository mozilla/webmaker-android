var utils = require('../../lib/utils');

var colorGroups = utils.baseColors;

module.exports = {
  className: 'color-picker',
  template: require('./index.html'),
  ready: function () {
    this.$on('openCP', function (color) {
      this.show = true;
      this.originalColor = color;
      this.cancelIntercept = this.onCancel.bind(this);
      document.addEventListener('backbutton',
        this.cancelIntercept, true);
    });
  },
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
          if (selected === color) {
            index = groupIndex;
          }
        });
      });
      return index || 0;
    }
  },
  methods: {
    selectColor: function (color) {
      this.selectedColor = color;
      this.enableSave();
    },
    enableSave: function () {
      this.$data.saveDisabled = false;
    },
    onSave: function (e) {
      e.preventDefault();
      this.show = false;
      this.$data.saveDisabled = true;
    },
    onCancel: function (e) {
      e.preventDefault();
      e.stopPropagation();
      document.removeEventListener('backbutton',
        this.cancelIntercept, true);
      this.selectedColor = this.originalColor;
      this.show = false;
    }
  },
  data: {
    colorGroups: colorGroups,
    colors: colorGroups.map(function (base) {
      var tints = [];
      for (var i = -5; i < 11; i++) {
        var colorString = utils.shadeColor(base, i * 6);
        colorString = colorString.toUpperCase();
        if (base !== colorString) {
          tints.push(colorString);
        }
      }
      return tints;
    }),
    saveDisabled: true
  }
};

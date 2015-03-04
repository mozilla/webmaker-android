module.exports = {
  id: 'color-picker-editor',
  template: require('./index.html'),
  components: {
    colorPicker: require('../../colorPicker')
  },
  data: {
    showColorPicker: false
  },
  methods: {
    onColorPickerDone: function () {
      this.$data.showColorPicker = false;
    },
    openColorPicker: function (e, color) {
      e.preventDefault();
      this.$broadcast('openCP', color);
    }
  }
};

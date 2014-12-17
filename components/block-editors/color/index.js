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
        }
    }
};

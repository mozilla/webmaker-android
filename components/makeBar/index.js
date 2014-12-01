// Takes two properties:
// - uiMode (string: 'preview', 'edit', or 'data')
// - onChange (function)
module.exports = {
    id: 'makeBar',
    template: require('./index.html'),
    methods: {
        setMode: function (mode) {
            var self = this;
            self.$data.uiMode = mode;
            if (self.$data.onChange) self.$data.onChange.call(self, mode);
        }
    }
};

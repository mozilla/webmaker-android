module.exports = {
    className: 'inline-editor',
    ready: function () {
        var self = this;

        self.$on('inlineEditorStarted', function (event) {
            if (event.index !== self.$index) {
                self.stopEditing();
            }
        });

        self.$on('onShimClick', function (event) {
            self.stopEditing();
        });
    },
    methods: {
        startEditing: function () {
            this.isEditMode = true;
            this.$dispatch('inlineEditorStarted', {index: this.$index});
            this.$el.classList.add('active');
        },
        stopEditing: function () {
            this.isEditMode = false;
            this.$dispatch('inlineEditorStopping', {index: this.$index});
            this.$el.classList.remove('active');
        },
        trash: function () {
            var self = this;

            self.stopEditing();

            setTimeout(function () {
                self.$dispatch('deleteBlock', {
                    index: self.index
                });
            }, 50);
        },
        duplicate: function () {
            var self = this;

            this.stopEditing();

            setTimeout(function () {
                self.$dispatch('cloneBlock', {
                    index: self.index
                });
            }, 50);
        },
        move: function (steps) {
            var self = this;

            self.stopEditing();

            // Delay about half the time the shim takes to fade out
            // Delay is also necessary for blockList to measure heights properly
            setTimeout(function () {
                self.$dispatch('shiftBlock', {
                    index: self.index,
                    steps: steps
                });
            }, 50);
        }
    },
    data: {
        mode: undefined,
        isEditMode: false,
        app: undefined
    },
    paramAttributes: ['mode', 'app', 'index'],
    template: require('./index.html')
};

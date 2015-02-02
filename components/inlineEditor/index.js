module.exports = {
    className: 'inline-editor',
    ready: function () {
        var self = this;

        self.appReference = self.$root.storage.getApp(self.app.id);

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
            this.appReference.remove(this.index);
            this.stopEditing();
        },
        duplicate: function () {
            this.appReference.duplicate(this.index);
            this.stopEditing();
        },
        move: function (steps) {
            this.appReference.move(this.index, steps);
            this.stopEditing();
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

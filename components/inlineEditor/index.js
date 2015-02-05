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
            this.centerEditor();
        },
        centerEditor: function () {
            // Elements
            var elEditor = this.$el;
            var elContainer = elEditor.offsetParent;
            var elControlPanel = elEditor.querySelector('.control-panel');
            var elNavBar = document.querySelector('#navigationBar');
            var elMakeBar = document.querySelector('#makeBar');

            // Dimensions:
            var containerHeight = elContainer.offsetHeight;

            function doScroll(direction) {
                if (direction === 'down') {
                    elContainer.scrollTop =
                        elEditor.offsetTop - elNavBar.offsetHeight - 10;
                } else if (direction === 'up') {
                    var overflow =
                        elEditor.offsetTop +
                        elEditor.offsetHeight;

                    overflow -=
                        elContainer.scrollTop +
                        containerHeight -
                        elMakeBar.offsetHeight;

                    elContainer.scrollTop += (overflow + 10);
                }
            }

            // Ensure control panel is rendered before measuring
            var heightCheck = setInterval(function () {
                if (elControlPanel.offsetHeight) {
                    clearInterval(heightCheck);

                    if (elContainer.scrollTop + elNavBar.offsetHeight >
                        elEditor.offsetTop) {

                        doScroll('down');
                    } else if (elEditor.offsetHeight + elEditor.offsetTop >
                        elContainer.scrollTop +
                        containerHeight -
                        elMakeBar.offsetHeight) {

                        doScroll('up');
                    }
                }
            }, 1);
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

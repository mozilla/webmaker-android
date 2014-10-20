module.exports = {
    id: 'publish-footer',
    template: require('./index.html'),
    data: {
        showFooter: false
    },
    methods: {
        toggleShowFooter: function (e) {
            if (e) e.preventDefault();
            this.$data.showFooter = !this.$data.showFooter;
            this.toggleOverlay(this.$data.showFooter);
        }
    },
    created: function () {
        var self = this;

        // Todo: we should abstract this into a component or common method
        var overlay = document.createElement('div');
        overlay.id = 'publish-overlay';
        overlay.classList.add('overlay');
        self.$el.parentNode.insertBefore(overlay, self.$el);

        overlay.addEventListener('click', function () {
            self.toggleShowFooter();
        }, false);

        self.toggleOverlay = function (show) {
            if (show) {
                overlay.classList.add('on');
            } else {
                overlay.classList.remove('on');
            }
        };
    }
};

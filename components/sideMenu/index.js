var transitionEndEventName = require('../../lib/transition-end-name')();
var Hammer = require('hammerjs');

module.exports = {
    id: 'side-menu',
    ready: function () {
        var self = this;

        var hammer = new Hammer(self.$el, {
            drag_min_distance:1,
            swipe_velocity:0.1
        });

        self.$on('openSideMenu', function (event) {
            self.open();
            hammer.on('swipeleft', function () {
                self.close();
            });
        });

        self.$on('closeSideMenu', function (event) {
            self.close();
            hammer.off('swipeleft');
        });

        // Closing transition will be unseen if left position is immediately set
        // Wait for CSS transitions to end before putting the menu offscreen
        self.$el.addEventListener(transitionEndEventName, function (event) {
            self.transitionsInProgress--;

            if (!self.transitionsInProgress && !self.isOpen) {
                self.$el.classList.remove('open');
                self.$emit('menuFinishedClosing');
            }
        });
    },
    methods: {
        onDataClick: function (event) {
            this.$on('menuFinishedClosing', function () {
                this.$dispatch('sideMenuDataClick');
            });

            this.close();
        },
        onShareClick: function (event) {
            this.$on('menuFinishedClosing', function () {
                this.$dispatch('sideMenuShareClick');
            });

            this.close();
        },
        onDeleteClick: function (event) {
            this.$dispatch('sideMenuDeleteClick');
            this.close(null, true);
        },
        onRootClick: function (event) {
            if (event && this.$el === event.target) {
                this.close();
            }
        },
        open: function () {
            this.isOpen = true;
            this.transitionsInProgress = 1;
            this.$el.classList.add('open');
            this.$el.classList.add('active');
        },
        close: function (event, keepShimOpen) {
            this.isOpen = false;
            this.transitionsInProgress = 1;
            this.$el.classList.remove('active');
            this.$dispatch('sideMenuClosed', {keepShimOpen: keepShimOpen});
        }
    },
    data: {
        transitionsInProgress: 0,
        isOpen: false
    },
    template: require('./index.html')
};

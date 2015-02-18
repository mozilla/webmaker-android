var transitionEndEventName = require('../../lib/transition-end-name')();
var network = require('../../lib/network.js');
var Hammer = require('hammerjs');

module.exports = {
    id: 'side-menu',
    ready: function () {
        var self = this;
        self.$data.isOnline = network.isOnline;

        var hammer = new Hammer(self.$el, {
            /* jscs: disable */
            drag_min_distance:1,
            swipe_velocity:0.1
            /* jscs: enable */
        });

        self.$on('openSideMenu', function (event) {
            self.$data.isOnline = network.isOnline;
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
        function onTransitionEnd(event) {
            self.transitionsInProgress--;
            if (!self.transitionsInProgress && !self.isOpen) {
                self.$el.classList.remove('open');
                self.$emit('menuFinishedClosing');
            }
        }
        self.$el.addEventListener(transitionEndEventName, onTransitionEnd);
    },
    detached: function () {
    },
    methods: {
        onDataClick: function (event) {
            event.preventDefault();
            this.$once('menuFinishedClosing', function () {
                this.$dispatch('sideMenuDataClick');
            });

            this.close();
        },
        onShareClick: function (event) {

            event.preventDefault();

            this.$once('menuFinishedClosing', function () {
                this.$dispatch('sideMenuShareClick');
            });

            this.close();
        },
        onDeleteClick: function (event) {
            event.preventDefault();
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
        isOpen: false,
        isOnline: true
    },
    template: require('./index.html')
};

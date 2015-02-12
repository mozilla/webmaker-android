var transitionEndEventName = require('../../lib/transition-end-name')();
var page = require('page');

module.exports = {
    id: 'side-menu',
    ready: function () {
        var self = this;

        self.$on('openSideMenu', function (event) {
            self.open();
        });

        self.$on('closeSideMenu', function (event) {
            self.close();
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
        isOpen: false
    },
    template: require('./index.html')
};

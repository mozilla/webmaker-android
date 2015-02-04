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
        self.$el.addEventListener(transitionEndEventName, function (event) {
            self.transitionsInProgress--;

            if (!self.transitionsInProgress && !self.isOpen) {
                self.$el.style.left = '-999999px';
            }
        });
    },
    methods: {
        onShareClick: function (event) {
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
            this.$el.style.left = '0';
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

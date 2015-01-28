module.exports = {
    id: 'shim',
    ready: function () {
        var self = this;

        self.$on('openShim', function (event) {
            self.open();
        });

        self.$on('closeShim', function (event) {
            self.close();
        });
    },
    methods: {
        open: function () {
            this.isOpen = true;
            this.$el.classList.add('active');
        },
        close: function (event) {
            this.isOpen = false;
            this.$el.classList.remove('active');
        },
        onShimClick: function (event) {
            this.$dispatch('onShimClick', event);
        }
    },
    data: {
        isOpen: false
    }
};

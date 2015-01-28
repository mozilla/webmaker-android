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
        }
    },
    data: {
        isOpen: false
    }
};

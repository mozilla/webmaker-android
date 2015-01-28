module.exports = {
    id: 'modal-prompt',
    ready: function () {
        var self = this;

        self.$on('openModalPrompt', function (event) {
            self.open();
        });

        self.$on('closeModalPrompt', function (event) {
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
            this.$dispatch('modalPromptClosed');
        },
        onConfirmClick: function (event) {
            this.$dispatch('onConfirmClick');
            this.close();
        }
    },
    data: {
        isOpen: false
    },
    template: require('./index.html')
};

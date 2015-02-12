var isPublishing = false;

module.exports = {
    className: 'publishing-status',
    template: require('./index.html'),
    ready: function() {
        var self = this;
        self.$data.isPublishing = isPublishing
        this.$on('publishingStarted', function() {
            self.$data.isPublishing = true;
            isPublishing = true;
        });
        this.$on('publishingDone', function() {
            self.$data.isPublishing = false;
            isPublishing = false;
        });
    }
};

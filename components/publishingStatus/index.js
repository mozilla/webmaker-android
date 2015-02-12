var isPublishing = false;
var isError = false;

module.exports = {
    className: 'publishing-status',
    template: require('./index.html'),
    ready: function () {
        var self = this;
        self.$data.isPublishing = isPublishing;
        self.$data.isError = isError;
        this.$on('publishingStarted', function () {
            self.$data.isPublishing = isPublishing = true;
            self.$data.isError = isError = false;
        });
        this.$on('publishingDone', function () {
            self.$data.isError = isError = false;
            self.$data.isPublishing = isPublishing = false;
        });
        this.$on('publishingError', function (err) {
            console.log('PublishingError', err);
            var message = err && err.message || 'There was a publishing error';
            self.$data.isError = isError = message;
            setTimeout(function () {
                self.$data.isPublishing = isPublishing = false;
            }, 5000);
        });
    }
};

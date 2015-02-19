var isPublishing = false;
var isError = false;
var analytics = require('../../lib/analytics');

module.exports = {
    className: 'publishing-status',
    template: require('./index.html'),
    data: {
        isOnline: true
    },
    ready: function () {
        var self = this;
        self.$data.isPublishing = isPublishing;
        self.$data.isError = isError;
        this.$on('publishingStarted', function () {
            self.$data.isPublishing = isPublishing = true;
            self.$data.isError = isError = false;
            analytics.event({category: 'Publishing', action: 'Started'});
        });
        this.$on('publishingDone', function () {
            self.$data.isError = isError = false;
            self.$data.isPublishing = isPublishing = false;
            analytics.event({category: 'Publishing', action: 'Done'});
        });
        this.$on('publishingError', function (err) {
            console.log('PublishingError', err);
            var message = err && err.message || 'There was a publishing error';
            self.$data.isError = isError = message;
            analytics.error({description: 'Publishing Error'});
            setTimeout(function () {
                self.$data.isPublishing = isPublishing = false;
            }, 5000);
        });
        this.$on('publishOffline', function () {
            self.$data.isOnline = false;
            self.$data.isPublishing = true;
            setTimeout(function () {
                self.$data.isPublishing = isPublishing = false;
            }, 5000);
        });
    }
};

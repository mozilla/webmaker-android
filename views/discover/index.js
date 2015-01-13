var view = require('../../lib/view');

var maxAppsToShow = 10;

module.exports = view.extend({
    id: 'discover',
    template: require('./index.html'),
    ready: function () {
        this.$on('switchValueChanged', function (event) {
            if (event === 'Newest') {
                this.showNewest();
            } else if (event === 'Featured') {
                this.showFeatured();
            }
        });

        this.showFeatured();
    },
    methods: {
        showNewest: function () {
            var self = this;

            self.mode = 'Newest';

            self.$root.storage._firebase
                .limitToLast(maxAppsToShow)
                .on('value', function (snapshot) {
                    self.apps.newest = snapshot.val();
                });
        },
        showFeatured: function () {
            var self = this;

            self.mode = 'Featured';

            self.$root.storage._firebase
                .orderByChild('isFeatured')
                .equalTo(true)
                .limitToLast(maxAppsToShow)
                .on('value', function (snapshot) {
                    self.apps.featured = snapshot.val();
                });
        }
    },
    data: {
        title: 'Discover',
        apps: {
            featured: [],
            newest: []
        }
    }
});

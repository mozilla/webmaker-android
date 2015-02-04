var view = require('../../lib/view');

module.exports = view.extend({
    id: 'profile',
    template: require('./index.html'),
    data: {
        title: 'My Profile',
        myApps: []
    },
    computed: {
        user: function () {
            return this.model.data.session.user;
        }
    },
    methods: {
        clean: function (e) {
            var self = this;
            self.$data.myApps.forEach(function (app) {
                self.$root.storage.getApp(app.id).removeApp();
            });
            self.$data.myApps = [];
        }
    },
    ready: function () {
        var self = this;
        var storage = self.$root.storage;
        // ------------------

        self.$data.myApps = storage.getApps();
        self.$root.isReady = true;

        function onAdded(val) {
            self.$data.myApps.push(val);
        }

        function onChanged(val) {
            console.log(val);
            self.$data.myApps.forEach(function (app, i) {
                if (app.id === val.id) {
                    self.$data.myApps.splice(i, 1);
                    self.$data.myApps.unshift(val);
                }
            });
        }

        function onRemoved(id) {
            var index = false;
            self.$data.myApps.forEach(function (app, i) {
                if (app.id === id) index = i;
            });
            if (index !== false) self.$data.myApps.splice(index, 1);
        }


        self.$on('query_changed', function () {
            self.$data.myApps = storage.getApps();
        });

        self.$on('app_added', onAdded);
        self.$on('app_removed', onRemoved);
        self.$on('app_changed', onChanged);
    }
});

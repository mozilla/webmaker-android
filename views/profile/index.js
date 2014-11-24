var view = require('../../lib/view');
var page = require('page');

module.exports = view.extend({
    id: 'profile',
    template: require('./index.html'),
    data: {
        title: 'My Profile',
        back: false,
        myApps: []
    },
    computed: {
        user: function () {
            return this.model.data.session.user;
        }
    },
    methods: {
        logout: function (e) {
            e.preventDefault();
            this.model.auth.logout();
        },
        clean: function (e) {
            var self = this;

            var username = this.model.data.session.user.username;
            this.model.data.apps.forEach(function (app, index) {
                if (app.author.username === username) {
                    delete self.model.data.apps[index];
                }
            });
            self.model.save(function () {
                page('/sign-in');
            });
        }
    },
    created: function () {
        var self = this;
        var user = self.model.data.session.user;

        function onAdded(snapshot) {
            var data = snapshot.val();
            if (!data) return;
            data.id = snapshot.key();
            self.$data.myApps.push(data);
        }

        function listenForApps(user) {
            if (!user || !user.id) return;
            return self.model.firebase
                .orderByChild('userId')
                .equalTo(user.id);
        }

        var query = listenForApps(self.model.data.session.user);
        if (query) query.on('child_added', onAdded);

        self.model.auth.on('login', function (user) {
            self.$data.myApps = [];
            if (query) query.off('child_added', onAdded);
            query = listenForApps(user);
            query.on('child_added', onAdded);
        });
        self.model.auth.on('logout', function () {
            self.$data.myApps = [];
            if (query) query.off('child_added', onAdded);
            query = null;
        });
    }
});
